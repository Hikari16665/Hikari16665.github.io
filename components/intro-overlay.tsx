"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  BIO_LIT,
  BIOS,
  BIO_TIMES,
  END_TIME,
  NAME,
  STAR_LINES,
  STAR_TIMES,
  STAR_Y,
  litIndexFor,
} from "@/lib/intro";
import { Spark } from "@/components/spark";
import { bootIntro, bootState } from "@/lib/intro-boot";
import { getAudioElement } from "@/lib/sound";

type Phase = "loading" | "blocked" | "armed" | "playing" | "done";

export function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [hidden, setHidden] = useState(false);
  const [shake, setShake] = useState(false);
  const [erasing, setErasing] = useState(false);
  const [stars, setStars] = useState(0);
  const [bioIndex, setBioIndex] = useState(-1);

  const fillRef = useRef<HTMLDivElement | null>(null);
  const pctRef = useRef<HTMLSpanElement | null>(null);
  const shownRef = useRef(0);
  const firedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const timersRef = useRef<number[]>([]);

  const later = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const finish = useCallback(() => {
    setPhase("done");
    document.documentElement.dataset.mode = "assemble";
    try {
      sessionStorage.setItem("intro-done", "1");
    } catch {
      /* 隐私模式下存不了也没关系 */
    }
    // 覆层淡出后卸载；data-mode 保持 assemble，
    // 之后换页时新的内容会继续用「搭建」的方式出现。
    later(() => setHidden(true), 1200);
  }, [later]);

  const startSequence = useCallback(() => {
    setPhase("playing");
    const audio = getAudioElement();
    const t0 = performance.now();

    let starIndex = 0;
    let bio = -1;
    let lastCt = -1;
    let lastAdvance = performance.now();

    const loop = () => {
      const ct = audio.currentTime;
      if (Math.abs(ct - lastCt) > 0.008) {
        lastCt = ct;
        lastAdvance = performance.now();
      }

      const wall = (performance.now() - t0) / 1000;
      const stalled = performance.now() - lastAdvance > 1200;
      const t = stalled ? Math.max(wall, ct) : ct;

      while (starIndex < STAR_TIMES.length && t >= STAR_TIMES[starIndex]) {
        starIndex += 1;
        setStars(starIndex);
      }

      let nextBio = -1;
      for (let i = 0; i < BIO_TIMES.length; i += 1) {
        if (t >= BIO_TIMES[i]) nextBio = i;
      }
      if (nextBio !== bio) {
        bio = nextBio;
        setBioIndex(nextBio);
      }

      if (t >= END_TIME) {
        finish();
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  }, [finish]);

  const attemptPlay = useCallback(async () => {
    const audio = getAudioElement();
    try {
      await audio.play();
      startSequence();
    } catch {
      // 浏览器拦截了自动播放：摇两下 → 擦掉进度条 → 点击进入
      setPhase("blocked");
      later(() => setShake(true), 320);
      later(() => {
        setShake(false);
        setErasing(true);
      }, 1320);
      later(() => setPhase("armed"), 1860);
    }
  }, [later, startSequence]);

  /* 载入资源：音频为主体（按字节），头像补最后一点 */
  useEffect(() => {
    try {
      if (sessionStorage.getItem("intro-done") === "1") {
        setHidden(true);
        return;
      }
    } catch {
      /* 隐私模式 */
    }
    bootIntro();
  }, []);

  /* 进度条的平滑推进：目标值由下载决定，显示值缓动追上去 */
  useEffect(() => {
    if (hidden) return;
    const startedAt = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startedAt;
      const floor = Math.min(0.82, elapsed / 1400);
      const target = bootState.loaded ? 1 : Math.max(floor, bootState.target);
      const shown = shownRef.current;
      const next = shown + (target - shown) * 0.12;
      const value = target - next < 0.0015 ? target : next;

      shownRef.current = value;
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${value.toFixed(4)})`;
      if (pctRef.current) {
        pctRef.current.textContent = String(Math.round(value * 100)).padStart(2, "0");
      }

      if (!firedRef.current && value > 0.995 && bootState.loaded) {
        firedRef.current = true;
        void attemptPlay();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [attemptPlay, hidden]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleEnter = useCallback(async () => {
    const audio = getAudioElement();
    try {
      await audio.play();
      startSequence();
    } catch {
      /* 再点一次就好 */
    }
  }, [startSequence]);

  if (hidden) return null;

  const showLoader = phase === "loading" || phase === "blocked";
  const showName = phase === "playing" || phase === "done";
  /** 星星阶段：最近一次敲击点亮的那颗（0–4），还没开始时为 -1 */
  const litIndex = litIndexFor(stars - 1);
  /** 最后四敲：整组点亮，不再单颗跳 */
  const bioLit = bioIndex >= 0 ? (BIO_LIT[bioIndex] ?? []) : null;
  const isLit = (index: number) => (bioLit ? bioLit.includes(index) : index === litIndex);

  return (
    <div
      className="intro"
      data-phase={phase}
      onClick={phase === "armed" ? handleEnter : undefined}
      role={phase === "armed" ? "button" : undefined}
      tabIndex={phase === "armed" ? 0 : undefined}
      onKeyDown={
        phase === "armed"
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") void handleEnter();
            }
          : undefined
      }
      aria-label={phase === "armed" ? "点击进入" : undefined}
    >
      <div className="intro-lines" aria-hidden>
        {STAR_LINES.map((x, index) => (
          <span
            key={index}
            className="intro-star"
            data-lit={isLit(index)}
            data-tone={index % 2 === 0 ? "cyan" : "pink"}
            style={{ left: `${x}%`, top: `${STAR_Y}%` }}
          >
            <Spark className="intro-spark" />
          </span>
        ))}
      </div>

      <div className="intro-stage">
        {showLoader && (
          <div className="intro-loader" data-shake={shake} data-erasing={erasing}>
            <p className="intro-label">
              <span>LOADING</span>
              <span className="intro-label-cn">拉取数据</span>
            </p>

            <div className="intro-bar">
              <div className="intro-track">
                <div className="intro-fill" ref={fillRef} />
              </div>
              <div className="intro-pct">
                <span ref={pctRef}>00</span>
                <span className="intro-pct-sign">%</span>
              </div>
            </div>
          </div>
        )}

        {phase === "armed" && (
          <button type="button" className="intro-enter" onClick={handleEnter}>
            点击进入
          </button>
        )}

        {showName &&
          (bioIndex >= 0 ? (
            <p key={`bio-${bioIndex}`} className="intro-bio">
              {BIOS[bioIndex]}
            </p>
          ) : (
            <h1 className="intro-name">{NAME}</h1>
          ))}
      </div>
    </div>
  );
}
