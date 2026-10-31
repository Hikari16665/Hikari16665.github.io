"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** 切换「房间」时把上一段的滚动位置归零 */
export function RouteReset() {
  const pathname = usePathname();

  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".scroller").forEach((el) => {
      el.scrollTop = 0;
    });
  }, [pathname]);

  return null;
}
