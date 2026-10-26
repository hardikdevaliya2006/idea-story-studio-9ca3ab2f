import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const profile = mkdtempSync(join(tmpdir(), "sp-"));
const height = process.argv[2] ?? "900";
const chrome = spawn(CHROME, [
  "--headless=new",
  "--remote-debugging-port=9341",
  `--user-data-dir=${profile}`,
  "--no-first-run",
  `--window-size=1400,${height}`,
  "--hide-scrollbars",
  "http://localhost:5199/services",
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 40; i++) {
  try {
    const list = await (await fetch("http://127.0.0.1:9341/json/list")).json();
    target = list.find((t) => t.type === "page" && t.url.includes("/services"));
    if (target) break;
  } catch {}
  await sleep(400);
}
if (!target) process.exit(1);

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
};
const send = (method, params = {}) =>
  new Promise((res) => {
    id += 1;
    pending.set(id, res);
    ws.send(JSON.stringify({ id, method, params }));
  });
const evaluate = async (expr) => {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { error: r.result.exceptionDetails.text };
  return r.result?.result?.value;
};

await sleep(8000);

const info = await evaluate(`(() => {
  const cards = [...document.querySelectorAll(".process-card")];
  const grid = cards[0]?.parentElement?.getBoundingClientRect();
  const stage = document.querySelector(".process-stage");
  return {
    viewport: [innerWidth, innerHeight],
    cards: cards.map((c) => {
      const r = c.getBoundingClientRect();
      const st = c.querySelector(".impact-stage")?.getBoundingClientRect();
      return { card: [Math.round(r.width), Math.round(r.height)], stage: st ? [Math.round(st.width), Math.round(st.height)] : null };
    }),
    gridHeight: grid ? Math.round(grid.height) : null,
    stickyHeight: stage ? Math.round(stage.querySelector(".md\\\\:sticky")?.getBoundingClientRect().height ?? 0) : null,
    bodyOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    activeTitle: document.querySelector(".process-card.is-active .process-title")?.textContent,
    scenes: document.querySelectorAll(".process-card .impact-stage").length,
  };
})()`);
console.log(JSON.stringify(info, null, 1));

// scroll through the pinned section and record the active step
const stageTop = await evaluate(`(() => { const el = document.querySelector(".process-stage"); return window.scrollY + el.getBoundingClientRect().top; })()`);
const stepAt = async (frac) => {
  await evaluate(`(() => { const el = document.querySelector(".process-stage"); const travel = el.offsetHeight - innerHeight; window.scrollTo(0, ${stageTop} + travel * ${frac}); return 1; })()`);
  await sleep(500);
  return evaluate(`document.querySelector(".process-card.is-active .process-title")?.textContent ?? null`);
};
console.log("steps:", await stepAt(0.05), await stepAt(0.4), await stepAt(0.7), await stepAt(0.98));

ws.close();
chrome.kill();
