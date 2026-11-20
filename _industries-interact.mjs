import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 2 });
await page.goto("http://localhost:3000/industries", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({ content: "header{visibility:hidden!important}" });
const rows = await page.$$(".ind-row");
await rows[5].hover();
await new Promise((r) => setTimeout(r, 700));
const state = await page.evaluate(() => {
  const active = document.querySelector(".ind-canvas-panel.is-active");
  return {
    row: [...document.querySelectorAll(".ind-row")].findIndex((r) =>
      r.classList.contains("is-active"),
    ),
    panel: active?.querySelector(".ind-canvas-title")?.textContent,
    steps: [...(active?.querySelectorAll(".ind-step-label") || [])].map((n) => n.textContent),
    tick: [...document.querySelectorAll(".ind-tick")].findIndex((t) =>
      t.classList.contains("is-active"),
    ),
  };
});
console.log(JSON.stringify(state));
const el = await page.$(".ind-layout");
await el.screenshot({
  path: "C:/Users/hardi/AppData/Local/Temp/opencode/services-shots/industries-interact.png",
});
await browser.close();
