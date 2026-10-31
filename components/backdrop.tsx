"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
  warm: boolean;
  depth: number;
};

/**
 * 背景星野：一层很淡的点，各自错开相位呼吸，跟着指针有一点点视差。
 * 和开场那五颗星是同一套语言，这里只是把它们留在背景里。
 */
function Starfield() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const stars: Star[] = [];

    const make = () => {
      const count = w < 780 ? 32 : 72;
      stars.length = 0;
      for (let i = 0; i < count; i += 1) {
        stars.push({
          x: Math.random(),
          y: Math.random(),
          r: 0.5 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 1.3,
          warm: Math.random() < 0.18,
          depth: 0.3 + Math.random() * 0.7,
        });
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      make();
    };
    resize();

    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;

    const onMove = (event: PointerEvent) => {
      tx = (event.clientX / w - 0.5) * 16;
      ty = (event.clientY / h - 0.5) * 16;
    };

    let raf = 0;
    const draw = (now: number) => {
      px += (tx - px) * 0.045;
      py += (ty - py) * 0.045;
      ctx.clearRect(0, 0, w, h);
      const time = now / 1000;

      for (const star of stars) {
        const alpha = 0.14 + 0.3 * (0.5 + 0.5 * Math.sin(time * star.speed + star.phase));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.warm ? "#8f9be0" : "#5467e8";
        ctx.beginPath();
        ctx.arc(star.x * w + px * star.depth, star.y * h + py * star.depth, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden />;
}

/**
 * 极光：四团很大的柔光，各自漂不同方向；最上面一层跟着音乐低频呼吸。
 * 全部在内容之下（z-0），不接收指针事件。
 */
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden>
      <div className="aurora">
        <i className="aurora-a" />
        <i className="aurora-b" />
        <i className="aurora-c" />
        <i className="aurora-d" />
        <span className="aurora-pulse" />
      </div>
      <Starfield />
    </div>
  );
}
