"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

import { Spark } from "@/components/spark";

const items = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/work", label: "作品" },
  { href: "/contact", label: "联系" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="relative z-10 mx-auto flex w-full max-w-[1500px] shrink-0 items-center justify-between gap-4 px-[var(--page-pad)] pb-[clamp(6px,1.2vh,14px)] pt-[clamp(16px,2.6vh,28px)]">
      <Link
        href="/"
        aria-label="Nyankolunii —— 返回首页"
        className="rise inline-flex items-start gap-[0.14em] whitespace-nowrap text-[clamp(18px,1.6vw,24px)] leading-none"
        style={{ "--d": "0ms" } as CSSProperties}
      >
        <span className="print-title">Nyankolunii</span>
        <Spark className="mt-[0.16em] size-[0.42em] shrink-0 text-hot" />
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
              className={`nav-link press rise ${active ? "" : "text-ink"}`}
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
