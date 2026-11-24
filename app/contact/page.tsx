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
    <Room scroll>
      <div className="contact">
        <h1 className="display rise text-[clamp(36px,4.6vw,56px)]">Contact</h1>

        <div className="ticket rise" style={{ animationDelay: "100ms" }}>
          <div className="ticket-main">
            <a href={`mailto:${profile.email}`} className="press print-title ticket-mail">
              {profile.email}
            </a>
            <div className="ticket-actions">
              <CopyButton value={profile.email} label="复制邮箱" doneLabel="已复制" />
              <span className="ticket-note">
                <span className="ticket-live" aria-hidden>
                  <span />
                </span>
                随时可以聊：开服 / 插件 / 别的
              </span>
            </div>
          </div>

          <div className="ticket-time">
            <p className="eyebrow">大连 · 本地时间</p>
            <LocalClock timeZone={profile.timeZone} />
            <p>
              通常两天内回消息。
              <br />
              急事请直接开 Issue。
            </p>
          </div>
        </div>

        <dl className="fact-row band-top rise" style={{ animationDelay: "200ms" }}>
          <div>
            <dt>可以聊</dt>
            <dd>
              开服、插件、
              <br />
              以及别的技术话题
            </dd>
          </div>
          <div>
            <dt>在哪里</dt>
            <dd>
              {profile.location}
              <br />
              UTC +8 · {profile.coords}
            </dd>
          </div>
          <div>
            <dt>别处</dt>
            <dd>
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
