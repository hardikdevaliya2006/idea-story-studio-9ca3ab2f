import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const OUT = "C:/Users/hardi/AppData/Local/Temp/opencode/title-shots";
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

for (const theme of ["light", "dark"]) {
  for (const width of [1280, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900, deviceScaleFactor: 2 });
    await page.evaluateOnNewDocument((t) => {
      try { localStorage.setItem("theme", t); } catch {}
    }, theme);
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: "html{scroll-behavior:auto!important}header{visibility:hidden!important}" });
    // Walk the page so every Reveal fires.
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < total; y += 700) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await new Promise((r) => setTimeout(r, 120));
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 600));
    const heads = await page.$$(".section-head");
    for (let i = 0; i < heads.length; i++) {
      await heads[i].screenshot({ path: `${OUT}/${theme}-${width}-head${i + 1}.png` });
    }
    console.log(`captured ${heads.length} heads (${theme}, ${width})`);
    await page.close();
  }
}
await browser.close();
