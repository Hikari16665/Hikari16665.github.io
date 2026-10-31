import type { CSSProperties } from "react";

import { PatternArt } from "@/components/pattern";
import { Room } from "@/components/room";
import { profile } from "@/lib/data";

const sep = <span className="px-2.5 text-accent">·</span>;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function HomePage() {
  return (
    <Room>
      <div className="grid flex-1 grid-cols-12 items-center gap-x-[clamp(16px,2vw,34px)]">
        {/* 左：一张印象图案 */}
        <div className="col-span-6 flex flex-col justify-center max-[780px]:hidden">
          <div className="pattern-wrap rise" style={d(60)}>
            <PatternArt
              variant="arcs"
              className="home-pattern aspect-[4/3] h-auto max-h-[42vh] w-full text-accent/75"
            />
          </div>
        </div>

        {/* 右：字标 + 一句话 */}
        <div className="col-span-6 col-start-7 max-[780px]:col-span-12 max-[780px]:col-start-1">
          <h1
            className="rise font-display text-[clamp(34px,5.6vw,76px)] leading-[1.06] tracking-[0.005em] max-[780px]:text-[clamp(32px,10.4vw,56px)]"
            style={d(220)}
          >
            {profile.name}
            <span
              aria-hidden
              className="relative ml-[0.06em] inline-block -translate-y-[0.55em] align-super text-[0.16em] leading-none text-accent"
            >
              ✦
            </span>
          </h1>

          <p
            className="rise mt-[clamp(10px,1.7vh,18px)] font-display text-[clamp(10.5px,1.06vw,13.5px)] uppercase leading-[1.5] tracking-[0.36em]"
            style={d(380)}
          >
            {profile.tagline}
          </p>

          <p className="rise mt-2 text-[13px] tracking-[0.12em] text-muted" style={d(430)}>
            {profile.bio}
          </p>

          <hr
            className="rise my-[clamp(16px,2.3vh,26px)] w-[clamp(40px,6vw,74px)] border-0 border-t border-rule"
            style={d(480)}
          />

          <p className="rise text-[15px]" style={d(540)}>
            {profile.role.map((item, i) => (
              <span key={item}>
                {i > 0 && sep}
                {item}
              </span>
            ))}
          </p>

          <p
            className="rise mt-[clamp(12px,1.7vh,18px)] text-[15px] leading-[1.5]"
            style={d(600)}
          >
            <span>合作 / 交流 / 提问：</span>
            <br />
            <a
              href={`mailto:${profile.email}`}
              className="press underline-link mt-1.5 inline-block"
            >
              {profile.email}
            </a>
          </p>
        </div>
      </div>
    </Room>
  );
}
