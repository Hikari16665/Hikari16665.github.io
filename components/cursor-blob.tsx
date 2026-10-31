"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  r: number;
};

/**
 * 参考站那颗跟着鼠标跑的小扁球：
 * 顺着运动方向拉长，停下来就缩成一个点，走的时候向四周溅出细小的粒子。
 * 触屏设备和「减少动态效果」下直接不启动。
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

    const target = { x: -200, y: -200 };
    const pos = { x: -200, y: -200 };
    const prev = { x: -200, y: -200 };
    let visible = false;
    let last = performance.now();
    let emitAcc = 0;
    const parts: Particle[] = [];

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        pos.x = target.x;
        pos.y = target.y;
        prev.x = pos.x;
        prev.y = pos.y;
        visible = true;
      }
    };

    const onLeave = () => {
      visible = false;
    };

    let raf = 0;
    const frame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;

      pos.x += (target.x - pos.x) * 0.26;
      pos.y += (target.y - pos.y) * 0.26;

      const vx = (pos.x - prev.x) / dt;
      const vy = (pos.y - prev.y) / dt;
      prev.x = pos.x;
      prev.y = pos.y;

      const speed = Math.hypot(vx, vy);
      const stretch = Math.min(2.6, 1 + speed * 0.0022);
      const angle = Math.atan2(vy, vx);

      // 向四面八方溅出粒子
      emitAcc += dt;
      if (visible && speed > 46 && emitAcc > 0.028) {
        emitAcc = 0;
        const count = speed > 420 ? 2 : 1;
        for (let i = 0; i < count; i += 1) {
          const a = Math.random() * Math.PI * 2;
          const s = 26 + Math.random() * 80;
          const life = 0.5 + Math.random() * 0.45;
          parts.push({
            x: pos.x,
            y: pos.y,
            vx: Math.cos(a) * s,
            vy: Math.sin(a) * s,
            life,
            max: life,
            r: 0.8 + Math.random() * 1.4,
          });
        }
      }

      ctx.clearRect(0, 0, w, h);

      for (let i = parts.length - 1; i >= 0; i -= 1) {
        const p = parts[i];
        p.life -= dt;
        if (p.life <= 0) {
          parts.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.93;
        p.vy *= 0.93;
        const t = p.life / p.max;
        ctx.globalAlpha = t * 0.45;
        ctx.fillStyle = "#5467e8";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.35 + t * 0.65), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (visible) {
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(angle);
        ctx.fillStyle = "rgba(84, 103, 232, 0.5)";
        ctx.beginPath();
        ctx.ellipse(0, 0, 5.4 * stretch, 5.4 / Math.sqrt(stretch), 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="cursor-blob" aria-hidden />;
}
