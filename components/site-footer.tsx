import type { CSSProperties } from "react";

import { SoundToggle } from "@/components/sound-toggle";
import { profile } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mx-auto flex w-full max-w-[1500px] items-end justify-between gap-6 px-[var(--page-pad)] pb-[clamp(16px,2.6vh,26px)] pt-[clamp(8px,1.4vh,16px)] max-[780px]:flex-col-reverse max-[780px]:items-start max-[780px]:gap-3.5">
      <p
        className="rise text-[11px] leading-[1.45] tracking-[0.02em] text-muted"
        style={{ "--d": "760ms" } as CSSProperties}
      >
        © {new Date().getFullYear()} {profile.alias} Built with NEXT.JS
      </p>

      <div className="flex items-center gap-[clamp(16px,2.3vw,30px)]">
        <ul
          className="rise flex items-center gap-[clamp(16px,2.3vw,30px)]"
          style={{ "--d": "800ms" } as CSSProperties}
        >
          <li>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="press press-diamond block text-ink transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="block size-[18px] fill-current" aria-hidden>
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12 24 5.73 18.27.5 12 .5z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href={profile.blog}
              target="_blank"
              rel="noreferrer"
              aria-label="博客 hikari.bond"
              className="press press-diamond block text-ink transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="block size-[18px] fill-none stroke-current" strokeWidth="1.6" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M3.6 9h16.8M3.6 15h16.8M12 3c2.6 2.6 2.6 15.4 0 18M12 21c-2.6-2.6-2.6-15.4 0-18" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href={`${profile.github}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              aria-label="全部仓库"
              className="press press-diamond block text-ink transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="block size-[18px] fill-none stroke-current" strokeWidth="1.6" aria-hidden>
                <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z" />
                <path d="M19 18v3H6.5A2.5 2.5 0 0 1 4 18.5" />
              </svg>
            </a>
          </li>
        </ul>

        <SoundToggle />
      </div>
    </footer>
  );
}
