"use client";

import { useEffect, useRef } from "react";

type Shard = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  life: number;
  max: number;
  size: number;
  color: string;
};

type TrailPoint = { x: number; y: number; born: number };

const SHARD_COLORS = ["#39d7cc", "#f5358d", "#f7c2dc"];

/**
 * 墨裂：移动时是一条很短的梅子色细线，旁边错一笔青。
 * 按住左键拖动时，线裂成青 / 洋红 / 浅粉的三角碎片，向两侧飘开，
 * 松开后大约 0.3s 散尽。触屏和「减少动态效果」下不启动。
 */
export function CursorBlob() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const pointer = { x: -200, y: -200 };
    const prev = { x: -200, y: -200 };
    let visible = false;
    let held = false;
    let last = performance.now();
    let lastEmit = 0;
    const trail: TrailPoint[] = [];
    const shards: Shard[] = [];

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      held = (event.buttons & 1) === 1;
      if (!visible) {
        prev.x = pointer.x;
        prev.y = pointer.y;
        visible = true;
      }
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      held = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const release = () => {
      held = false;
    };

    const onLeave = () => {
      visible = false;
      held = false;
    };

    const strokeTrail = (ox: number, oy: number, color: string, width: number, alpha: number) => {
      if (trail.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(trail[0].x + ox, trail[0].y + oy);
      for (let i = 1; i < trail.length; i += 1) {
        ctx.lineTo(trail[i].x + ox, trail[i].y + oy);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = alpha;
      ctx.stroke();
    };

    let raf = 0;
    const frame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;

      const vx = (pointer.x - prev.x) / dt;
      const vy = (pointer.y - prev.y) / dt;
      prev.x = pointer.x;
      prev.y = pointer.y;
      const speed = Math.hypot(vx, vy);

      if (visible) {
        const lastPoint = trail[trail.length - 1];
        if (!lastPoint || Math.hypot(pointer.x - lastPoint.x, pointer.y - lastPoint.y) > 2.4) {
          trail.push({ x: pointer.x, y: pointer.y, born: now });
        }
      }

      const cutoff = now - 160;
      while (trail.length > 0 && trail[0].born < cutoff) trail.shift();
      if (trail.length > 18) trail.splice(0, trail.length - 18);

      if (held && visible && speed > 40 && now - lastEmit > 24) {
        lastEmit = now;
        const inv = speed || 1;
        const nx = -vy / inv;
        const ny = vx / inv;
        const count = speed > 680 ? 3 : 2;
        for (let i = 0; i < count; i += 1) {
          const side = i % 2 === 0 ? 1 : -1;
          const burst = 90 + Math.random() * 160;
          const life = 0.3;
          shards.push({
            x: pointer.x + nx * side * 3,
            y: pointer.y + ny * side * 3,
            vx: nx * side * burst + vx * 0.03,
            vy: ny * side * burst * 0.72 + vy * 0.02,
            rot: Math.atan2(ny * side, nx * side) + (Math.random() - 0.5),
            vr: (Math.random() - 0.5) * 8,
            life,
            max: life,
            size: 3.4 + Math.random() * 5.2,
            color: SHARD_COLORS[(Math.random() * SHARD_COLORS.length) | 0],
          });
        }
        if (shards.length > 96) shards.splice(0, shards.length - 96);
      }

      ctx.clearRect(0, 0, w, h);

      for (let i = shards.length - 1; i >= 0; i -= 1) {
        const shard = shards[i];
        shard.life -= dt;
        if (shard.life <= 0) {
          shards.splice(i, 1);
          continue;
        }
        shard.x += shard.vx * dt;
        shard.y += shard.vy * dt;
        shard.vx *= 0.955;
        shard.vy *= 0.955;
        shard.rot += shard.vr * dt;
        const t = shard.life / shard.max;
        ctx.save();
        ctx.translate(shard.x, shard.y);
        ctx.rotate(shard.rot);
        ctx.globalAlpha = Math.max(0, t);
        ctx.fillStyle = shard.color;
        ctx.beginPath();
        ctx.moveTo(shard.size, 0);
        ctx.lineTo(-shard.size * 0.62, shard.size * 0.46);
        ctx.lineTo(-shard.size * 0.28, -shard.size * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      if (visible && trail.length > 1) {
        const fade = Math.min(1, trail.length / 5);
        strokeTrail(-1.7, 0.2, "#39d7cc", 1.05, 0.8 * fade);
        strokeTrail(1.5, 0.7, "#f5358d", 0.85, 0.42 * fade);
        strokeTrail(0, 0, "#402347", 1.35, 0.92 * fade);
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", release);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", release);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="cursor-blob" aria-hidden />;
}
