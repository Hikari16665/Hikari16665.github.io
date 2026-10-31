"use client";

import { useEffect, useState } from "react";

export function LocalClock({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("zh-CN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone,
          }).format(new Date()),
        );
      } catch {
        setTime(new Date().toTimeString().slice(0, 5));
      }
    };

    tick();
    const id = window.setInterval(tick, 20000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  // 服务端先渲染占位，避免时区造成的水合不一致
  return (
    <p className="mt-2 font-display text-[clamp(32px,3.4vw,46px)] leading-none tracking-[0.02em] [font-variant-numeric:tabular-nums]">
      {time ?? "--:--"}
    </p>
  );
}
