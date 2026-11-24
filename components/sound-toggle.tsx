"use client";

import { toggleSound, useSound } from "@/lib/sound";

/**
 * 页脚的声音开关：开场那首歌会一直放着，
 * 这里给一个不打扰的暂停 / 继续。
 */
export function SoundToggle() {
  const { ready, playing } = useSound();

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={() => void toggleSound()}
      aria-pressed={playing}
      className="sound-toggle ml-[clamp(4px,1vw,12px)] inline-flex items-center gap-1.5 text-[10px] text-muted"
    >
      <span aria-hidden className={playing ? "animate-pulse" : ""}>
        ♪
      </span>
      {playing ? "sound on" : "sound off"}
    </button>
  );
}
