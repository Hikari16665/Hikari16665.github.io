import type { ReactNode } from "react";

type RoomProps = {
  children: ReactNode;
  /** 内容超出一屏时在「房间」内部滚动（作品页需要） */
  scroll?: boolean;
  className?: string;
};

/**
 * 一屏一段的「房间」：固定高度，切换路由时整块淡入。
 * 高屏不滚动，矮屏在段内滚动，保持参考站的单屏感。
 */
export function Room({ children, scroll = false, className = "" }: RoomProps) {
  return (
    <div className="absolute inset-0">
      <div
        className={`h-full px-[var(--page-pad)] ${
          scroll ? "scroller overflow-y-auto" : "overflow-hidden"
        }`}
      >
        <div
          className={`mx-auto flex min-h-full w-full max-w-[1500px] flex-col py-[clamp(8px,1.8vh,24px)] ${
            scroll ? "justify-start" : "justify-center"
          } ${className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
