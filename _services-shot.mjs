import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const OUT = "C:/Users/hardi/AppData/Local/Temp/opencode/services-shots";
mkdirSync(OUT, { recursive: true });

const widths = process.argv[2] ? process.argv[2].split(",").map(Number) : [1280, 390];
const themes = process.argv[3] ? process.argv[3].split(",") : ["light", "dark"];
const tag = process.argv[4] || "services";
const url = process.argv[5] || "http://localhost:3001/services";
const selector = process.argv[6] || "#services";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

for (const theme of themes) {
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewport({
      width,
      height: Math.max(900, Math.round(width * 0.9)),
      deviceScaleFactor: 2,
    });
    await page.evaluateOnNewDocument((t) => {
      try {
        localStorage.setItem("theme", t);
      } catch {
        /* theme persistence is optional in the capture harness */
      }
    }, theme);
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content:
        "html { scroll-behavior: auto !important; } header { visibility: hidden !important; }",
    });
    const section = await page.$(selector);
    if (!section) {
      console.error(`element ${selector} not found at ${width}`);
      await page.close();
      continue;
    }
    await section.evaluate((n) => n.scrollIntoView({ block: "start", behavior: "instant" }));
    // Walk the whole section so every Reveal fires before the still is taken.
    const height = await section.evaluate((n) => n.getBoundingClientRect().height);
    for (let y = 0; y < height; y += Math.round(width * 0.7)) {
      await page.evaluate((v) => window.scrollBy(0, v), Math.round(width * 0.7));
      await new Promise((r) => setTimeout(r, 180));
    }
    await section.evaluate((n) => n.scrollIntoView({ block: "start", behavior: "instant" }));
    await new Promise((r) => setTimeout(r, 1800));
    await section.screenshot({ path: `${OUT}/${tag}-${theme}-${width}.png` });
    console.log(`saved ${tag}-${theme}-${width}.png`);
    await page.close();
  }
}
await browser.close();
