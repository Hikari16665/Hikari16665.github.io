/**
 * 把播放中的音频接一个 AnalyserNode，取低频能量写进 --audio-level（0–1）。
 * 只在 AudioContext 真的跑起来之后才接管音频图，避免把声音弄哑。
 */

let attached = false;
let pending = false;

export function ensureAudioLevel(audio: HTMLAudioElement) {
  if (attached || pending) return;

  // 远端 OSS 没开 CORS：跨源的媒体接进 WebAudio 会变成静音，直接跳过
  try {
    const src = audio.currentSrc || audio.src;
    if (!src) return;
    if (new URL(src, window.location.href).origin !== window.location.origin) return;
  } catch {
    return;
  }

  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return;

  pending = true;

  let ctx: AudioContext;
  try {
    ctx = new Ctor();
  } catch {
    pending = false;
    return;
  }

  const start = () => {
    if (attached || ctx.state !== "running") {
      pending = false;
      return;
    }
    try {
      const source = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.82;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      attached = true;
      pending = false;
      loop(analyser, audio);
    } catch {
      pending = false;
    }
  };

  if (ctx.state === "running") {
    start();
  } else {
    ctx.resume().then(start).catch(() => {
      pending = false;
    });
  }
}

function loop(analyser: AnalyserNode, audio: HTMLAudioElement) {
  const data = new Uint8Array(analyser.frequencyBinCount);
  const bins = 10;
  let slow = 0;

  const tick = () => {
    analyser.getByteFrequencyData(data);
    let sum = 0;
    for (let i = 0; i < bins; i += 1) sum += data[i];

    const now = audio.paused ? 0 : sum / bins / 255;
    // 慢慢跟着整体响度走，只把「突然变响」的那一下放出来
    slow += (now - slow) * 0.08;
    const punch = Math.max(0, now - slow) * 3.4;
    const level = Math.min(1, punch);

    document.documentElement.style.setProperty("--audio-level", level.toFixed(3));
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
