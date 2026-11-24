import type { CSSProperties } from "react";

import { PatternArt } from "@/components/pattern";
import { Room } from "@/components/room";
import { Spark } from "@/components/spark";
import { profile } from "@/lib/data";

const sep = <span className="px-2.5 text-berry">·</span>;

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
              className="home-pattern aspect-[4/3] h-auto max-h-[42vh] w-full"
            />
          </div>
        </div>

        {/* 右：字标 + 一句话 */}
        <div className="col-span-6 col-start-7 max-[780px]:col-span-12 max-[780px]:col-start-1">
          <h1
            className="rise flex items-start text-[clamp(34px,5.2vw,70px)] leading-[0.96] max-[780px]:text-[clamp(32px,10vw,52px)]"
            style={d(220)}
          >
            <span className="print-title">{profile.name}</span>
            <Spark className="ml-[0.1em] mt-[0.18em] size-[0.2em] shrink-0 text-hot" />
          </h1>

          <p
            className="rise wordmark mt-[clamp(10px,1.7vh,18px)] text-[clamp(10.5px,1.06vw,13.5px)] leading-[1.5]"
            style={d(380)}
          >
            {profile.tagline}
          </p>

          <p className="rise mt-2 text-[13px] tracking-[0.12em] text-muted" style={d(430)}>
            {profile.bio}
          </p>

          <hr
            className="band-rule rise my-[clamp(16px,2.3vh,26px)] w-[clamp(56px,8vw,108px)] border-0"
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
