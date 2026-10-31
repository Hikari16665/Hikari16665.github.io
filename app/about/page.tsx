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
    <Room>
      <div className="grid grid-cols-12 items-start gap-x-[clamp(16px,2.4vw,40px)] py-[clamp(6px,1.6vh,20px)]">
        <div className="col-span-6 max-[1000px]:col-span-7 max-[780px]:col-span-12">
          <div className="flex items-baseline gap-4">
            <h1 className="display rise text-[clamp(38px,5vw,62px)]">About</h1>
          </div>

          <div
            className="rise mt-[clamp(18px,3vh,32px)] max-w-[34em] space-y-[1.15em] text-[15px] leading-[1.78] text-[#17171b]"
            style={{ animationDelay: "120ms" }}
          >
            <p>
              你好，这个小站不会记录很多，这是我与我想创作的东西的故事。
            </p>
            <p>
              从 {profile.joined} 年开始，我在GitHub上留下了三十多个仓库。大部分是给自家服务器写的小东西，小玩意，
              大家如果真的用的上，那便是我开发的理由。如果用不上，也是我为自己做的一件小事。
            </p>
            <p>
              如果可以，我会把这一切比作一次“创世”，我心目中世界的样子，没有那么难到达。
              我也留下了一些库之类的东西。如果对你方便，欢迎取用！
            </p>
            <p>
              Working Project: <Link href="/work" className="underline-link">HikariServerLauncher2</Link>
              把MC开服做成一个启动器。【真的能做到吗？】，还在写，欢迎来 Issues 提意见。
            </p>
          </div>

          <dl
            className="rise mt-[clamp(24px,4vh,40px)] grid max-w-[34em] grid-cols-3 gap-4 border-t border-rule pt-4 max-[780px]:grid-cols-1 max-[780px]:gap-3"
            style={{ animationDelay: "200ms" }}
          >
            <div>
              <dt className="text-[10px] uppercase tracking-[0.24em] text-muted">现居</dt>
              <dd className="mt-1 text-[13px]">大连，UTC+8</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.24em] text-muted">在写</dt>
              <dd className="mt-1 text-[13px]">Java/Python/TypeScript</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.24em] text-muted">加入 GitHub</dt>
              <dd className="mt-1 text-[13px]">{profile.joined} 年</dd>
            </div>
          </dl>
        </div>

        <div className="col-span-5 col-start-8 max-[1000px]:col-span-4 max-[1000px]:col-start-9 max-[780px]:col-span-12 max-[780px]:col-start-1 max-[780px]:mt-7">
          <div className="rise" style={{ animationDelay: "180ms" }}>
            <Portrait />
          </div>
        </div>
      </div>
    </Room>
  );
}
