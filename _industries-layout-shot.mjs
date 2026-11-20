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
const el = await page.$(".ind-layout");
await el.evaluate((n) => n.scrollIntoView({ block: "start", behavior: "instant" }));
await new Promise((r) => setTimeout(r, 1200));
await el.screenshot({
  path: "C:/Users/hardi/AppData/Local/Temp/opencode/services-shots/industries-layout.png",
});
await browser.close();
