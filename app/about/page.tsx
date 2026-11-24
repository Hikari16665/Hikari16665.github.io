import type { Metadata } from "next";
import Link from "next/link";

import { Portrait } from "@/components/portrait";
import { Room } from "@/components/room";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "关于",
  description: "Self Introduction Website",
};

export default function AboutPage() {
  return (
    <Room scroll>
      <div className="about">
        <h1 className="display about-title rise text-[clamp(36px,4.6vw,56px)]">About</h1>
        <div className="about-portrait rise" style={{ animationDelay: "160ms" }}>
          <Portrait />
        </div>
        <div className="rise about-prose" style={{ animationDelay: "120ms" }}>
            <p>你好，这个小站不会记录很多，这是我与我想创作的东西的故事。</p>
            <p>
              从 {profile.joined} 年开始，我在GitHub上留下了三十多个仓库。大部分是给自家服务器写的小东西，小玩意，
              大家如果真的用的上，那便是我开发的理由。如果用不上，也是我为自己做的一件小事。
            </p>
            <p>
              如果可以，我会把这一切比作一次“创世”，我心目中世界的样子，没有那么难到达。
              我也留下了一些库之类的东西。如果对你方便，欢迎取用！
            </p>
            <p>
              Working Project: <Link href="/work" className="underline-link">HikariServerLauncher2</Link>把MC开服做成一个启动器。【真的能做到吗？】，还在写，欢迎来 Issues 提意见。
            </p>
          </div>

        <dl className="fact-row band-top rise" style={{ animationDelay: "200ms" }}>
            <div>
              <dt>现居</dt>
              <dd>大连，UTC+8</dd>
            </div>
            <div>
              <dt>在写</dt>
              <dd>Java/Python/TypeScript</dd>
            </div>
            <div>
              <dt>加入 GitHub</dt>
              <dd>{profile.joined} 年</dd>
            </div>
          </dl>
      </div>
    </Room>
  );
}
