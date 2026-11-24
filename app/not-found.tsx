import Link from "next/link";

import { Room } from "@/components/room";

export default function NotFound() {
  return (
    <Room>
      <div className="max-w-[34em]">
        <p className="eyebrow rise">404 · 走错房间了</p>
        <h1
          className="display rise mt-4 text-[clamp(38px,5vw,62px)]"
          style={{ animationDelay: "60ms" }}
        >
          Nothing
        </h1>
        <p className="rise mt-6 text-[15px] leading-[1.78] text-ink" style={{ animationDelay: "120ms" }}>
          这个地址没有内容。也许是我还没写，也许是链接旧了。
        </p>
        <p className="rise mt-6 text-[15px]" style={{ animationDelay: "160ms" }}>
          <Link href="/" className="underline-link">
            回到首页
          </Link>
        </p>
      </div>
    </Room>
  );
}
