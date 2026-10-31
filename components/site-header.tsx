"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

const items = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/work", label: "作品" },
  { href: "/contact", label: "联系" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="relative z-10 mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4 px-[var(--page-pad)] pb-[clamp(6px,1.2vh,14px)] pt-[clamp(16px,2.6vh,28px)]">
      <Link
        href="/"
        aria-label="Nyankolunii —— 返回首页"
        className="rise inline-flex items-start gap-[0.16em] font-display text-[clamp(19px,1.7vw,25px)] leading-none tracking-[0.02em] text-ink transition-colors hover:text-accent"
        style={{ "--d": "0ms" } as CSSProperties}
      >
        Nyankolunii
        <span aria-hidden className="mt-[0.1em] text-[0.42em] leading-none text-accent">
          ✦
        </span>
      </Link>

      <nav
        aria-label="主导航"
        className="flex gap-[clamp(14px,3.4vw,48px)] text-[15px] max-[780px]:gap-[14px] max-[780px]:text-[12.5px]"
      >
        {items.map((item, index) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active}
              aria-current={active ? "page" : undefined}
              className={`nav-link press rise transition-colors hover:text-accent ${
                active ? "text-accent" : "text-ink"
              }`}
              style={{ "--d": `${80 + index * 30}ms` } as CSSProperties}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
