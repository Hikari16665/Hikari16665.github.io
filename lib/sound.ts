"use client";

import { useSyncExternalStore } from "react";

import { ensureAudioLevel } from "@/lib/audio-level";

/**
 * 一个极小的音频单例 store：
 * 开场组件负责加载 / 播放，页脚的音量开关负责暂停 / 继续。
 */

type SoundState = {
  ready: boolean;
  playing: boolean;
};

let audio: HTMLAudioElement | null = null;
let state: SoundState = { ready: false, playing: false };
const listeners = new Set<() => void>();

function setState(patch: Partial<SoundState>) {
  state = { ...state, ...patch };
  listeners.forEach((fn) => fn());
}

export function getAudioElement(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio();
    audio.preload = "auto";
    audio.addEventListener("play", () => {
      setState({ playing: true });
      if (audio) ensureAudioLevel(audio);
    });
    audio.addEventListener("pause", () => setState({ playing: false }));
    audio.addEventListener("ended", () => setState({ playing: false }));
    setState({ ready: true });

    if (process.env.NODE_ENV !== "production") {
      (window as unknown as Record<string, unknown>).__audio = audio;
    }
  }
  return audio;
}

export function subscribeSound(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function getSoundSnapshot(): SoundState {
  return state;
}

const serverSnapshot: SoundState = { ready: false, playing: false };
export function getSoundServerSnapshot(): SoundState {
  return serverSnapshot;
}

export function useSound(): SoundState {
  return useSyncExternalStore(subscribeSound, getSoundSnapshot, getSoundServerSnapshot);
}

export async function toggleSound() {
  if (!audio) return;
  if (audio.paused) {
    try {
      await audio.play();
    } catch {
      /* 被浏览器拦下就保持暂停 */
    }
  } else {
    audio.pause();
  }
}
