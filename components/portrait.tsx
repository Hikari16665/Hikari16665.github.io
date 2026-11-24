import Image from "next/image";

import { Spark } from "@/components/spark";

export function Portrait() {
  return (
    <figure className="m-0 w-full max-w-[min(420px,46vh)] justify-self-end max-[1000px]:max-w-[min(340px,40vh)] max-[780px]:max-w-[340px] max-[780px]:justify-self-start">
      <div className="portrait-frame relative aspect-[4/5] overflow-hidden">
        <Image
          src="/avatar.jpg"
          alt="Nyankolunii 的头像"
          fill
          priority
          sizes="(max-width: 780px) 340px, 420px"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper/55 via-transparent to-transparent" />
        <Spark className="absolute right-3 top-3 size-[14px] text-hot" />
      </div>
      <figcaption className="mt-2.5 text-[11px] leading-[1.45] tracking-[0.02em] text-muted">
        头像 —— Nyankolunii，来自 GitHub
      </figcaption>
    </figure>
  );
}
