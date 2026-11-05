import { useEffect, useRef } from "react";
/** 4x4 Bayer matrix, normalised to 0..1 — gives the ordered-dither look. */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
function smoothstep(a, b, v) {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
/**
 * Ordered-dither dot field: square dots locked to a fixed grid switch on/off as
 * a smooth, slowly flowing wave field crosses a Bayer threshold. Density is
 * highest at the left/right edges and fades toward the centre; the cursor
 * locally stirs the field so nearby dots flicker. Pointer tracking is
 * window-level and hit-tested, so the canvas stays pointer-events: none.
 */
export default function AnimatedDotField({
  colorVar = "--agent-dither-front",
  cell = 10,
  centerClear = 0.24,
  className = "absolute inset-0",
}) {
  const host = useRef(null);
  useEffect(() => {
    const el = host.current;
    const canvas = el?.querySelector("canvas");
    const ctx = canvas?.getContext("2d");
    if (!el || !canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const readColor = () => getComputedStyle(el).getPropertyValue(colorVar).trim() || "#22c55e";
    let color = readColor();
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let base = new Float32Array(0);
    let frame = 0;
    let lastDraw = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999, strength: 0, target: 0 };
    /** Static density per cell: edges dense, centre empty, clear disc at icon. */
    const build = () => {
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
      base = new Float32Array(cols * rows);
      const cx = width / 2;
      const cy = height / 2;
      const halo = Math.min(width, height) * centerClear;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c + 0.5) * cell;
          const y = (r + 0.5) * cell;
          const edge = Math.min(x, width - x) / width;
          const side = 1 - smoothstep(0.02, 0.36, edge);
          const bottom = 0.85 + 0.15 * (y / height);
          const clear = smoothstep(halo, halo * 1.5, Math.hypot(x - cx, y - cy));
          base[r * cols + c] = side * bottom * clear;
        }
      }
    };
    const draw = (now) => {
      const t = reduced.matches ? 0 : now / 1000;
      mouse.strength += (mouse.target - mouse.strength) * 0.15;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      const size = Math.max(2, Math.round(cell * 0.3));
      const off = Math.round((cell - size) / 2);
      const mr = Math.min(width, height) * 0.28;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const b = base[r * cols + c] ?? 0;
          if (b <= 0.01) continue;
          const x = (c + 0.5) * cell;
          const y = (r + 0.5) * cell;
          // Smooth flowing wave field (sum of slow sines) — coherent, not random.
          const wave =
            Math.sin(x * 0.045 + t * 0.8) * 0.5 +
            Math.sin(y * 0.05 - t * 0.6) * 0.5 +
            Math.sin((x + y) * 0.03 + t * 1.1) * 0.35;
          let v = b * 1.05 + wave * 0.16 - 0.08;
          if (mouse.strength > 0.01) {
            const d = Math.hypot(x - mouse.x, y - mouse.y);
            if (d < mr) {
              const k = (1 - d / mr) ** 2 * mouse.strength;
              v += Math.sin(d * 0.25 - t * 6) * 0.35 * k;
            }
          }
          if (v <= (BAYER[(r & 3) * 4 + (c & 3)] ?? 1)) continue;
          ctx.globalAlpha = 0.55 + 0.45 * Math.min(1, b + 0.2);
          ctx.fillRect(Math.round(c * cell + off), Math.round(r * cell + off), size, size);
        }
      }
      ctx.globalAlpha = 1;
    };
    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      // Dither steps read best slightly stepped (~30fps), and it's cheaper.
      if (now - lastDraw < 33) return;
      lastDraw = now;
      draw(now);
    };
    const start = () => {
      if (frame || !visible || reduced.matches) return;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const resize = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (!w || !h || (w === width && h === height)) return;
      width = w;
      height = h;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      draw(performance.now());
    };
    const onPointer = (e) => {
      const r = el.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.target =
        mouse.x >= 0 && mouse.y >= 0 && mouse.x <= r.width && mouse.y <= r.height ? 1 : 0;
    };
    const onLeave = () => (mouse.target = 0);
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) start();
      else stop();
    });
    io.observe(el);
    const theme = new MutationObserver(() => {
      color = readColor();
      draw(performance.now());
    });
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    const onMotion = () => {
      if (reduced.matches) {
        stop();
        draw(0);
      } else start();
    };
    reduced.addEventListener("change", onMotion);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    resize();
    start();
    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      theme.disconnect();
      reduced.removeEventListener("change", onMotion);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [colorVar, cell, centerClear]);
  return (
    <div
      ref={host}
      className={`${className} pointer-events-none overflow-hidden`}
      aria-hidden="true"
    >
      <canvas className="block size-full" />
    </div>
  );
}
