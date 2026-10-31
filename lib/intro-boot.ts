import { AUDIO_SRC } from "@/lib/intro";
import { getAudioElement } from "@/lib/sound";

/**
 * 开场的资源准备。放在模块级，只跑一次。
 *
 * 音乐走远端 OSS（github.io 太慢），而那个桶没有开 CORS，
 * 所以不能 fetch 读字节 —— 只能读 <audio> 自己的 buffered 进度：
 * 0–96% 按缓冲走，canplaythrough 之后补到 100%。
 */
export const bootState = {
  /** 0–1，目标进度 */
  target: 0,
  loaded: false,
  started: false,
};

export function bootIntro() {
  if (bootState.started) return;
  bootState.started = true;

  const audio = getAudioElement();
  audio.src = AUDIO_SRC;
  audio.load();

  const readBuffered = () => {
    try {
      const duration = audio.duration;
      if (!Number.isFinite(duration) || duration <= 0) return 0;
      const ranges = audio.buffered;
      let end = 0;
      for (let i = 0; i < ranges.length; i += 1) end = Math.max(end, ranges.end(i));
      return Math.min(1, end / duration);
    } catch {
      return 0;
    }
  };

  const onProgress = () => {
    bootState.target = Math.max(bootState.target, readBuffered() * 0.96);
  };

  const finish = () => {
    bootState.loaded = true;
    bootState.target = 1;
    audio.removeEventListener("progress", onProgress);
    audio.removeEventListener("loadedmetadata", onProgress);
  };

  audio.addEventListener("progress", onProgress);
  audio.addEventListener("loadedmetadata", onProgress);

  if (audio.readyState >= 3) {
    finish();
    return;
  }

  audio.addEventListener("canplaythrough", finish, { once: true });
  audio.addEventListener("error", finish, { once: true });
  // 网络慢也让开场能往下走，不要卡死在进度条
  window.setTimeout(finish, 15000);
}
