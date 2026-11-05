import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  BufferAttribute,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  WebGLRenderer,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
/* Brand-green mascot palette: mint shell fading into the site's deep green. */
const SHELL_TOP = 0x7ce8ab;
const SHELL_BOTTOM = 0x087845;
const EYE_RIM = 0xeafff4;
const EYE_GLOW = 0x8affc6;
const PUPIL = 0x06231a;
const CHIN = 0x041a13;
const BAR_GLOW = 0x6bffb4;
const EAR = 0x0a6a3e;
const box = (w, h, d, r) => new RoundedBoxGeometry(w, h, d, 6, r);
/**
 * Three.js mascot head for the agent card. Rounded helmet with lit eyes, a
 * small chin display and side ears; the head turns toward the cursor with a
 * lazy idle sway. Client-only (WebGL) and paused while off screen.
 */
export default function AgentFace3D() {
  const host = useRef(null);
  useEffect(() => {
    const el = host.current;
    const canvas = el?.querySelector("canvas");
    if (!el || !canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setClearAlpha(0);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 1, 0.1, 60);
    camera.position.set(0, 0.1, 4.95);
    camera.lookAt(0, 0, 0);
    /* ---------- head shell: vertical mint → deep green gradient ---------- */
    const shellGeometry = box(2.05, 1.82, 1.52, 0.52);
    shellGeometry.computeBoundingBox();
    const bounds = shellGeometry.boundingBox;
    const position = shellGeometry.getAttribute("position");
    const colors = new Float32Array(position.count * 3);
    const top = new Color(SHELL_TOP);
    const bottom = new Color(SHELL_BOTTOM);
    const mixed = new Color();
    for (let i = 0; i < position.count; i += 1) {
      const raw = (position.getY(i) - bounds.min.y) / (bounds.max.y - bounds.min.y);
      mixed.copy(bottom).lerp(top, raw * raw * (3 - 2 * raw));
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }
    shellGeometry.setAttribute("color", new BufferAttribute(colors, 3));
    const shellMaterial = new MeshPhysicalMaterial({
      vertexColors: true,
      roughness: 0.38,
      metalness: 0.08,
      clearcoat: 0.55,
      clearcoatRoughness: 0.32,
    });
    const rimMaterial = new MeshPhysicalMaterial({
      color: EYE_RIM,
      emissive: EYE_GLOW,
      emissiveIntensity: 0.35,
      roughness: 0.24,
      metalness: 0.02,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
    });
    const pupilMaterial = new MeshPhysicalMaterial({
      color: PUPIL,
      roughness: 0.16,
      metalness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });
    const glintMaterial = new MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0xd6ffe8,
      emissiveIntensity: 1.6,
      roughness: 0.1,
    });
    const chinMaterial = new MeshPhysicalMaterial({
      color: CHIN,
      roughness: 0.28,
      metalness: 0.1,
      clearcoat: 0.8,
    });
    const barMaterial = new MeshPhysicalMaterial({
      color: 0x0a2c20,
      emissive: BAR_GLOW,
      emissiveIntensity: 1.6,
      roughness: 0.3,
    });
    const earMaterial = new MeshPhysicalMaterial({
      color: EAR,
      roughness: 0.45,
      metalness: 0.06,
      clearcoat: 0.4,
    });
    const head = new Group();
    scene.add(head);
    const shell = new Mesh(shellGeometry, shellMaterial);
    head.add(shell);
    /* ---------- face: two lit eyes, chin display, side ears ---------- */
    for (const side of [-1, 1]) {
      const eye = new Mesh(box(0.64, 0.66, 0.16, 0.18), rimMaterial);
      eye.position.set(side * 0.47, 0.2, 0.73);
      head.add(eye);
      const pupil = new Mesh(box(0.42, 0.46, 0.12, 0.12), pupilMaterial);
      pupil.position.set(side * 0.47, 0.2, 0.82);
      head.add(pupil);
      const glint = new Mesh(new SphereGeometry(0.045, 16, 16), glintMaterial);
      glint.position.set(side * 0.47 - 0.09, 0.35, 0.88);
      head.add(glint);
      const bar = new Mesh(box(0.07, 0.22, 0.04, 0.02), barMaterial);
      bar.position.set(side * 0.15, -0.55, 0.8);
      head.add(bar);
      const ear = new Mesh(new CylinderGeometry(0.3, 0.3, 0.28, 36), earMaterial);
      ear.rotation.z = Math.PI / 2;
      ear.position.set(side * 1.05, 0, 0);
      head.add(ear);
    }
    const chin = new Mesh(box(1.02, 0.44, 0.14, 0.15), chinMaterial);
    chin.position.set(0, -0.55, 0.72);
    head.add(chin);
    /* ---------- lighting ---------- */
    const hemi = new HemisphereLight(0xd7ffe8, 0x032018, 1.4);
    const key = new DirectionalLight(0xffffff, 3.2);
    key.position.set(2.4, 3.4, 4.6);
    const rim = new DirectionalLight(0x9dffc9, 2.6);
    rim.position.set(-3.4, -0.8, -2.6);
    const front = new PointLight(0x6dffb0, 16, 14, 2);
    front.position.set(-1.2, 1.6, 3.4);
    scene.add(hemi, key, rim, front);
    /* ---------- sizing ---------- */
    let width = 0;
    let height = 0;
    /* ---------- pointer follow (scoped to the card) ---------- */
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const card = el.closest(".bento-card");
    const started = performance.now();
    const render = (now) => {
      const t = (now - started) / 1000;
      if (!reduced.matches) {
        current.x += (target.x - current.x) * 0.06;
        current.y += (target.y - current.y) * 0.06;
        head.rotation.y = current.x * 0.45 + Math.sin(t * 0.5) * 0.12;
        head.rotation.x = -current.y * 0.32 + Math.sin(t * 0.42) * 0.05;
        head.rotation.z = -current.x * 0.05;
        head.position.y = Math.sin(t * 0.9) * 0.045;
      }
      renderer.render(scene, camera);
    };
    const resize = () => {
      const rect = el.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width));
      const nextHeight = Math.max(1, Math.round(rect.height));
      if (nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      render(performance.now());
    };
    const onMove = (e) => {
      if (!card || reduced.matches) return;
      const rect = card.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
      target.y = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    card?.addEventListener("pointermove", onMove, { passive: true });
    card?.addEventListener("pointerleave", onLeave);
    /* ---------- loop, visibility and cleanup ---------- */
    let frame = 0;
    let visible = true;
    const loop = (now) => {
      frame = requestAnimationFrame(loop);
      render(now);
    };
    const start = () => {
      if (frame || !visible || reduced.matches) return;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) start();
      else stop();
    });
    io.observe(el);
    const onMotion = () => {
      if (reduced.matches) {
        stop();
        render(performance.now());
      } else start();
    };
    reduced.addEventListener("change", onMotion);
    resize();
    start();
    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      reduced.removeEventListener("change", onMotion);
      card?.removeEventListener("pointermove", onMove);
      card?.removeEventListener("pointerleave", onLeave);
      scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          for (const material of materials) material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);
  return (
    <div ref={host} className="agent-face" aria-hidden="true">
      <canvas className="block size-full" />
    </div>
  );
}
