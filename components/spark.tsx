/** 四点星火花，墨色轨道里的小火花 */
export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 .4 13.9 10.1 23.6 12 13.9 13.9 12 23.6 10.1 13.9.4 12 10.1 10.1Z"
      />
    </svg>
  );
}
