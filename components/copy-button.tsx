"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  label?: string;
  doneLabel?: string;
};

export function CopyButton({ value, label = "复制主页", doneLabel = "已复制" }: Props) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // 剪贴板不可用时也不打断阅读
    }
    setDone(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      data-done={done}
      className="chip"
    >
      {done ? doneLabel : label}
    </button>
  );
}
