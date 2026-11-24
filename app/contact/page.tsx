import type { Metadata } from "next";

import { CopyButton } from "@/components/copy-button";
import { LocalClock } from "@/components/local-clock";
import { Room } from "@/components/room";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "联系",
  description: "写信给 Hikari（Nyankolunii）：contact@hikari.bond。",
};

export default function ContactPage() {
  return (
    <Room>
      <div className="grid grid-cols-12 items-end gap-x-[clamp(16px,2vw,34px)]">
        <div className="col-span-7 max-[780px]:col-span-12">
          <h1 className="display rise text-[clamp(38px,5vw,62px)]">Contact</h1>

          <a
            href={`mailto:${profile.email}`}
            className="press print-title rise mt-[clamp(20px,3.6vh,40px)] inline-block text-[clamp(22px,3.4vw,44px)] leading-[1.05] max-[780px]:text-[clamp(20px,6.2vw,32px)]"
            style={{ animationDelay: "100ms" }}
          >
            {profile.email}
          </a>

          <div
            className="rise mt-[18px] flex flex-wrap items-center gap-4"
            style={{ animationDelay: "160ms" }}
          >
            <CopyButton value={profile.email} label="复制邮箱" doneLabel="已复制" />
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted">
              <span className="relative flex size-[5px]">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-berry/40" />
                <span className="relative inline-flex size-[5px] rounded-full bg-berry" />
              </span>
              随时可以聊：开服 / 插件 / 别的
            </span>
          </div>
        </div>

        <aside
          className="col-span-3 col-start-10 justify-self-end text-right max-[780px]:col-span-12 max-[780px]:col-start-1 max-[780px]:mt-8 max-[780px]:justify-self-start max-[780px]:text-left"
          style={{ animationDelay: "200ms" }}
        >
          <p className="eyebrow">大连 · 本地时间</p>
          <div className="rise" style={{ animationDelay: "200ms" }}>
            <LocalClock timeZone={profile.timeZone} />
            <p className="mt-3 text-[11px] leading-[1.6] tracking-[0.03em] text-muted">
              通常两天内回消息。
              <br />
              急事请直接开 Issue。
            </p>
          </div>
        </aside>

        <dl
          className="band-top rise col-span-12 mt-[clamp(34px,6vh,64px)] grid max-w-[900px] grid-cols-3 gap-[clamp(18px,3vw,44px)] pt-[clamp(20px,3vh,30px)] max-[780px]:grid-cols-1 max-[780px]:gap-4"
          style={{ animationDelay: "240ms" }}
        >
          <div>
            <dt className="mb-1.5 text-[10px] uppercase tracking-[0.24em] text-muted">可以聊</dt>
            <dd className="text-[14px] leading-[1.5]">开服、插件、<br />以及别的技术话题</dd>
          </div>
          <div>
            <dt className="mb-1.5 text-[10px] uppercase tracking-[0.24em] text-muted">在哪里</dt>
            <dd className="text-[14px] leading-[1.5]">
              {profile.location}
              <br />
              UTC +8 · {profile.coords}
            </dd>
          </div>
          <div>
            <dt className="mb-1.5 text-[10px] uppercase tracking-[0.24em] text-muted">别处</dt>
            <dd className="text-[14px] leading-[1.5]">
              <a href={profile.github} target="_blank" rel="noreferrer" className="underline-link">
                GitHub
              </a>
              {" · "}
              <a href={profile.blog} target="_blank" rel="noreferrer" className="underline-link">
                hikari.bond
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </Room>
  );
}
