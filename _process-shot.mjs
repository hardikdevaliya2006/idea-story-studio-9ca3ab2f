import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const OUT = "C:/Users/hardi/AppData/Local/Temp/opencode/process-shots-v6";
mkdirSync(OUT, { recursive: true });
const URL = "http://localhost:3000/services";

for (let i = 0; i < 30; i++) {
  try {
    const res = await fetch(URL);
    if (res.ok) break;
  } catch {}
  await new Promise((r) => setTimeout(r, 500));
}

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

async function open(width, theme, reduced) {
  const page = await browser.newPage();
  await page.setViewport({
    width,
    height: Math.max(900, Math.round(width * 0.9)),
    deviceScaleFactor: 2,
  });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: reduced ? "reduce" : "no-preference" },
  ]);
  await page.evaluateOnNewDocument((t) => {
    try { localStorage.setItem("theme", t); } catch {}
  }, theme);
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important; } header { visibility: hidden !important; }",
  });
  const section = await page.$(".impact-process");
  await section.evaluate((n) => n.scrollIntoView({ block: "center", behavior: "instant" }));
  await new Promise((r) => setTimeout(r, 500));
  return { page, section };
}

const phases = ["discover", "plan", "build", "scale"];
for (const theme of ["light", "dark"]) {
  for (const width of [1280, 390]) {
    const { page, section } = await open(width, theme, true);
    for (let i = 0; i < phases.length; i++) {
      await page.evaluate((idx) => {
        document.querySelectorAll(".process-step")[idx].click();
      }, i);
      await new Promise((r) => setTimeout(r, 350));
      await section.screenshot({ path: `${OUT}/still-${theme}-${width}-${phases[i]}.png` });
    }
    console.log(`stills: ${theme}-${width}`);
    await page.close();
  }
}

// Animated loop at the real width: 22 frames at 600ms.
{
  const { page, section } = await open(1280, "light", false);
  for (let i = 0; i < 24; i++) {
    await section.screenshot({ path: `${OUT}/loop-${String(i).padStart(2, "0")}.png` });
    await new Promise((r) => setTimeout(r, 600));
  }
  console.log("loop captured");
  await page.close();
}
await browser.close();
