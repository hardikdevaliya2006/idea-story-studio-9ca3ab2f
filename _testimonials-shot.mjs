import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const OUT = "C:/Users/hardi/AppData/Local/Temp/opencode/testimonials-shots";
mkdirSync(OUT, { recursive: true });

const widths = [1280, 390];
const themes = ["light", "dark"];
const url = "http://localhost:3000/";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

for (const theme of themes) {
  for (const width of widths) {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.setViewport({
      width,
      height: Math.max(900, Math.round(width * 0.9)),
      deviceScaleFactor: 2,
    });
    await page.evaluateOnNewDocument((t) => {
      try {
        localStorage.setItem("theme", t);
      } catch {
        /* optional */
      }
    }, theme);
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content:
        "html { scroll-behavior: auto !important; } header { visibility: hidden !important; }",
    });

    const section = await page.$("section:has(.tm-wrap)");
    if (!section) {
      console.error(`testimonial section not found at ${width}`);
      await page.close();
      continue;
    }
    await section.evaluate((n) => n.scrollIntoView({ block: "start", behavior: "instant" }));
    const height = await section.evaluate((n) => n.getBoundingClientRect().height);
    for (let y = 0; y < height; y += Math.round(width * 0.7)) {
      await page.evaluate((v) => window.scrollBy(0, v), Math.round(width * 0.7));
      await new Promise((r) => setTimeout(r, 160));
    }
    await section.evaluate((n) => n.scrollIntoView({ block: "start", behavior: "instant" }));
    await new Promise((r) => setTimeout(r, 1000));
    await section.screenshot({ path: `${OUT}/tm2-${theme}-${width}-poster.png` });

    // Hover a card: the row recedes and one voice comes forward.
    const card = await page.$(".tm-viewport .tm-card:nth-child(3)");
    if (card) {
      await card.hover();
      await new Promise((r) => setTimeout(r, 700));
      await section.screenshot({ path: `${OUT}/tm2-${theme}-${width}-hover.png` });
    }

    // The pause control is a real state change.
    const toggle = await page.$(".tm-toggle");
    if (toggle) {
      await toggle.click();
      await new Promise((r) => setTimeout(r, 500));
      await section.screenshot({ path: `${OUT}/tm2-${theme}-${width}-paused.png` });
    }

    const report = await page.evaluate(() => {
      const viewport = document.querySelector(".tm-viewport");
      const track = document.querySelector(".tm-marquee");
      const cards = [...document.querySelectorAll(".tm-card")];
      return {
        cards: cards.length,
        state: getComputedStyle(track).animationPlayState,
        mask: getComputedStyle(viewport).maskImage !== "none",
        toggle: document.querySelector(".tm-toggle")?.getAttribute("aria-pressed"),
        quoteFont: getComputedStyle(document.querySelector(".tm-quote")).fontSize,
      };
    });
    console.log(`${theme}/${width}:`, JSON.stringify(report), "errors:", errors.length ? errors : "none");
    await page.close();
  }
}
await browser.close();
