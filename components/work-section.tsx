"use client";

import { useMemo, useState, type CSSProperties } from "react";

import { ProjectPlate } from "@/components/plates";
import { Spark } from "@/components/spark";
import { categories, projects, type Category } from "@/lib/data";

type Filter = "all" | Category;

const labelFor = (id: Category) => categories.find((cat) => cat.id === id)?.label ?? id;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function WorkSection() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      projects
        .map((project, index) => ({ project, index }))
        .filter(({ project }) => filter === "all" || project.category === filter),
    [filter],
  );

  return (
    <div className="work">
      <div className="work-head">
        <h1 className="display rise text-[clamp(36px,4.4vw,54px)]">Work</h1>

        <div
          className="rise work-filters"
          style={d(80)}
          role="group"
          aria-label="按类型筛选作品"
        >
          {categories.map((cat, i) => (
            <span key={cat.id} className="work-filter">
              {i > 0 && <Spark className="size-[7px] shrink-0 text-hot" />}
              <button
                type="button"
                onClick={() => setFilter(cat.id)}
                aria-pressed={filter === cat.id}
                className={`filter-btn font-display text-[clamp(13px,1.4vw,17px)] leading-none ${
                  filter === cat.id ? "" : "text-ink"
                }`}
              >
                {cat.label}
              </button>
            </span>
          ))}
        </div>

        <p className="work-count rise" style={d(120)} aria-live="polite">
          {visible.length} / {projects.length} 件
        </p>
      </div>

      <ol className="work-index">
        {visible.map(({ project, index }, order) => (
          <li key={project.name}>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="work-row rise"
              style={d(140 + order * 45)}
            >
              <ProjectPlate id={project.cover.id} />
              <div className="work-copy">
                <p className="work-kicker">
                  <span className="work-no">{String(index + 1).padStart(2, "0")}</span>
                  <span>{labelFor(project.category)}</span>
                  <span className="work-tag">{project.cover.tag}</span>
                  <span className="work-stars" aria-label={`${project.stars} 颗星`}>
                    ★ {project.stars}
                  </span>
                </p>
                <h2>{project.name}</h2>
                <p className="work-summary">{project.summary}</p>
                <p className="work-meta">
                  <span>
                    {project.year} · {project.stack}
                  </span>
                  <span className="work-go">
                    GitHub
                    <span aria-hidden> ↗</span>
                  </span>
                </p>
              </div>
            </a>
          </li>
        ))}
      </ol>

      {visible.length === 0 && <p className="work-empty">这一类还没有放上来。</p>}
    </div>
  );
}
