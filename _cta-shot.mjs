import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const OUT = "C:/Users/hardi/AppData/Local/Temp/opencode/cta-shots";
mkdirSync(OUT, { recursive: true });

const tag = process.argv[2] || "before";
const url = process.argv[3] || "http://localhost:3000/services";
const widths = [1280, 900, 390];
const themes = ["light", "dark"];

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
      try { localStorage.setItem("theme", t); } catch { /* optional */ }
    }, theme);
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: "html { scroll-behavior: auto !important; } header { visibility: hidden !important; }" });
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < total; y += Math.round(width * 0.6)) {
      await page.evaluate((v) => window.scrollBy(0, v), Math.round(width * 0.6));
      await new Promise((r) => setTimeout(r, 90));
    }
    const cta = await page.$(".cta-section");
    await cta.evaluate((n) => n.scrollIntoView({ block: "center", behavior: "instant" }));
    await new Promise((r) => setTimeout(r, 3400));
    const path = `${OUT}/${tag}-${theme}-${width}.png`;
    await cta.screenshot({ path });
    console.log(`saved ${tag}-${theme}-${width}.png`);

    const rects = await page.evaluate(() => {
      const pick = (s) => {
        const e = document.querySelector(s);
        if (!e) return null;
        const r = e.getBoundingClientRect();
        return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
      };
      return {
        section: pick(".cta-section"), panel: pick(".cta-panel"), body: pick(".cta-panel-body"),
        copy: pick(".cta-panel-copy"), title: pick(".cta-panel-title"), actions: pick(".cta-panel-actions"),
        conv: pick(".cta-conv"), well: pick(".cta-conv-well"), window: pick(".cta-conv-window"),
        compose: pick(".cta-conv-compose"),
      };
    });
    console.log(JSON.stringify(rects));
    await page.close();
  }
}
await browser.close();
