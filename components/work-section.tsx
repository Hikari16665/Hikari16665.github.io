"use client";

import { useMemo, useState, type CSSProperties } from "react";

import { categories, projects, type Category } from "@/lib/data";
import { PatternArt } from "@/components/pattern";

type Filter = "all" | Category;

export function WorkSection() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => projects.filter((p) => filter === "all" || p.category === filter),
    [filter],
  );

  return (
    <>
      {/* 标题与筛选同一行，像参考站那样 */}
      <div className="flex flex-wrap items-baseline gap-x-[clamp(16px,3vw,54px)] gap-y-3">
        <div className="flex items-baseline gap-4">
          <h1 className="display rise text-[clamp(38px,5vw,62px)]">Work</h1>
        </div>

        <div
          className="rise flex flex-wrap items-center gap-x-[clamp(10px,1.4vw,18px)] gap-y-2 max-[780px]:gap-x-3"
          style={{ animationDelay: "100ms" }}
          role="group"
          aria-label="按类型筛选作品"
        >
          {categories.map((cat, i) => (
            <div key={cat.id} className="flex items-center gap-x-[clamp(10px,1.4vw,18px)] max-[780px]:gap-x-3">
              {i > 0 && (
                <span aria-hidden className="text-[7px] leading-none text-accent">
                  ◆
                </span>
              )}
              <button
                type="button"
                onClick={() => setFilter(cat.id)}
                aria-pressed={filter === cat.id}
                className={`font-display text-[clamp(13px,1.5vw,19px)] uppercase leading-none tracking-[0.2em] transition-colors hover:text-accent ${
                  filter === cat.id ? "text-accent" : "text-ink"
                }`}
              >
                {cat.label}
              </button>
            </div>
          ))}
        </div>

        <span className="ml-auto hidden text-[10px] uppercase tracking-[0.2em] text-muted sm:block">
          {visible.length} / {projects.length} 件
        </span>
      </div>

      {/* 网格：首件通栏，其余三列 */}
      <div
        className="rise mt-[clamp(18px,3.2vh,32px)] grid grid-cols-6 gap-[clamp(12px,1.5vw,22px)]"
        style={{ animationDelay: "150ms" }}
      >
        {visible.map((project, index) => {
          const isWide = index === 0;
          const metaColor =
            project.cover.tone === "dark" ? "rgba(255,255,255,0.62)" : "rgba(11,11,13,0.45)";
          const patternColor = project.cover.tone === "dark" ? "text-white/60" : "text-accent/55";

          const style = {
            "--c1": project.cover.from,
            "--c2": project.cover.to,
          } as CSSProperties;

          return (
            <article
              key={project.name}
              className={`min-w-0 max-[780px]:col-span-6 ${
                isWide ? "col-span-6" : "col-span-2"
              }`}
            >
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="card-link group block text-inherit no-underline"
              >
                <div
                  className={`poster border border-ink/[0.06] ${
                    isWide ? "aspect-[16/5.6] max-[780px]:aspect-[4/3]" : "aspect-[4/3]"
                  }`}
                  style={style}
                >
                  <PatternArt variant={project.cover.pattern} className={patternColor} />
                  <span
                    className="absolute right-4 top-3 z-[3] text-[10px] tracking-[0.22em]"
                    style={{ color: metaColor }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="absolute bottom-3 right-4 z-[3] text-[9.5px] uppercase tracking-[0.16em]"
                    style={{ color: metaColor }}
                  >
                    {project.cover.tag}
                  </span>
                </div>

                <div className="flex flex-col gap-1 pt-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                  <h3 className="font-display text-[clamp(15px,1.35vw,18px)] leading-snug transition-colors group-hover:text-accent">
                    {project.name}
                  </h3>
                  <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted sm:whitespace-nowrap">
                    {project.year} · {project.stack}
                  </p>
                </div>

                <p className="mt-1 max-w-[46ch] text-[11px] leading-[1.6] text-muted">
                  {project.summary}
                  <span className="ml-1.5 text-accent" aria-label={`${project.stars} 颗星`}>
                    ★ {project.stars}
                  </span>
                </p>
              </a>
            </article>
          );
        })}
      </div>
    </>
  );
}
