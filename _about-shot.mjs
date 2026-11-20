import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const OUT = "C:/Users/hardi/AppData/Local/Temp/opencode/about-shots";
mkdirSync(OUT, { recursive: true });

const widths = process.argv[2] ? process.argv[2].split(",").map(Number) : [1280, 390];
const themes = process.argv[3] ? process.argv[3].split(",") : ["light", "dark"];
const tag = process.argv[4] || "about";
const url = process.argv[5] || "http://localhost:3000/about";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

for (const theme of themes) {
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: Math.max(900, Math.round(width * 0.8)), deviceScaleFactor: 1 });
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
    // Walk the page so every Reveal fires before any still is taken.
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < total; y += Math.round(width * 0.6)) {
      await page.evaluate((v) => window.scrollBy(0, v), Math.round(width * 0.6));
      await new Promise((r) => setTimeout(r, 120));
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 1400));

    const sections = await page.$$("#main-content section, #main-content > div:last-child");
    for (let i = 0; i < sections.length; i++) {
      const el = sections[i];
      await el.evaluate((n) => n.scrollIntoView({ block: "start", behavior: "instant" }));
      await new Promise((r) => setTimeout(r, 250));
      const path = `${OUT}/${tag}-${theme}-${width}-s${i + 1}.png`;
      try {
        await el.screenshot({ path });
        console.log(`saved ${tag}-${theme}-${width}-s${i + 1}.png`);
      } catch (err) {
        console.error(`failed ${tag}-${theme}-${width}-s${i + 1}: ${err.message}`);
      }
    }
    await page.close();
  }
}
await browser.close();
