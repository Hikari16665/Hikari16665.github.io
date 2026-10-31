import type { Metadata } from "next";

import { Room } from "@/components/room";
import { WorkSection } from "@/components/work-section";
import { profile, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "作品",
  description: "Hikari 的项目：Minecraft 服务端插件、桌面工具与网页。",
};

export default function WorkPage() {
  return (
    <Room scroll>
      <div className="pt-1">
        <WorkSection />
      </div>

      <p className="mt-[clamp(20px,4vh,36px)] border-t border-rule pt-5 text-[11px] leading-[1.7] tracking-[0.02em] text-muted">
        这里放了 {projects.length} 件能拿出来看的，全部 {profile.repos} 个仓库在{" "}
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="underline-link text-ink"
        >
          GitHub
        </a>
        。
      </p>
    </Room>
  );
}
