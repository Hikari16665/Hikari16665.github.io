import type { CSSProperties } from "react";
import Link from "next/link";

import { Spark } from "@/components/spark";
import { Room } from "@/components/room";
import { profile, projects } from "@/lib/data";

const sep = <span className="px-2.5 text-berry">·</span>;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const stops = [
  { href: "/", label: "首页", note: profile.city, here: true },
  { href: "/about", label: "关于", note: String(profile.joined), here: false },
  { href: "/work", label: "作品", note: `${projects.length} 件`, here: false },
  { href: "/contact", label: "联系", note: "UTC+8", here: false },
];

export default function HomePage() {
  const writing = projects[0];

  return (
    <Room>
      <div className="home">
        <div className="home-copy">
          <h1 className="rise flex items-start text-[clamp(40px,6.4vw,84px)] leading-[0.92]" style={d(40)}>
            <span className="print-title">{profile.name}</span>
            <Spark className="ml-[0.08em] mt-[0.16em] size-[0.18em] shrink-0 text-hot" />
          </h1>

          <p className="rise wordmark mt-3 text-[clamp(11px,1.05vw,13.5px)] leading-[1.5]" style={d(140)}>
            {profile.tagline}
          </p>

          <p className="rise mt-2 text-[13px] tracking-[0.14em] text-muted" style={d(200)}>
            {profile.bio}
          </p>

          <hr className="band-rule rise my-5 w-[clamp(64px,8vw,112px)] border-0" style={d(260)} />

          <p className="rise text-[15px]" style={d(320)}>
            {profile.role.map((item, i) => (
              <span key={item}>
                {i > 0 && sep}
                {item}
              </span>
            ))}
          </p>

          <p className="rise mt-4 text-[15px] leading-[1.55]" style={d(380)}>
            <span className="text-muted">合作 / 交流 / 提问</span>
            <br />
            <a href={`mailto:${profile.email}`} className="press underline-link mt-1 inline-block">
              {profile.email}
            </a>
          </p>

          <p className="now rise" style={d(460)}>
            <span className="now-kicker">还在写</span>
            <a href={writing.href} target="_blank" rel="noreferrer">
              {writing.name}
            </a>
            <span className="now-stack">{writing.stack}</span>
          </p>
        </div>

        <nav className="route rise" style={d(180)} aria-label="目录">
          <p className="eyebrow">目录</p>
          <ol>
            {stops.map((stop) => (
              <li key={stop.href}>
                <Link href={stop.href} className="stop" data-here={stop.here || undefined} aria-current={stop.here ? "page" : undefined}>
                  <span className="stop-dot" aria-hidden />
                  <span className="stop-copy">
                    <span className="stop-label">{stop.label}</span>
                    <span className="stop-note">{stop.note}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </Room>
  );
}
