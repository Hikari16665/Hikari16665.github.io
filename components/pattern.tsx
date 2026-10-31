export type PatternVariant =
  | "arcs"
  | "stack"
  | "route"
  | "wave"
  | "blocks"
  | "chunks"
  | "orbit"
  | "stars";

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/**
 * 占位用的「印象图案」：1px 的线，纯几何。
 * 每个 pattern 只是对应项目的一点暗示 —— 服务器、路径、声波、方块、区块、轨道、星。
 */
function Shape({ variant }: { variant: PatternVariant }) {
  switch (variant) {
    case "arcs":
      return (
        <>
          <line x1="0" y1="299.5" x2="400" y2="299.5" strokeOpacity="0.5" />
          {range(8).map((i) => (
            <circle
              key={i}
              cx="0"
              cy="300"
              r={48 + i * 44}
              strokeOpacity={i % 2 === 0 ? 0.5 : 0.22}
            />
          ))}
          <circle cx="0" cy="300" r="4" fill="currentColor" stroke="none" fillOpacity="0.6" />
          <circle cx="300" cy="120" r="2.5" fill="currentColor" stroke="none" fillOpacity="0.45" />
          <line x1="300" y1="120" x2="300" y2="20" strokeOpacity="0.25" strokeDasharray="2 6" />
        </>
      );

    case "stack":
      return (
        <>
          <rect x="0.5" y="0.5" width="399" height="299" strokeOpacity="0.28" />
          {range(22).map((i) => (
            <line
              key={i}
              x1="16"
              x2={i % 3 === 0 ? 384 : 240 + (i % 5) * 28}
              y1={10 + i * 13}
              y2={10 + i * 13}
              strokeOpacity={i % 2 === 0 ? 0.42 : 0.16}
            />
          ))}
          <rect x="232" y="46" width="92" height="22" fill="currentColor" stroke="none" fillOpacity="0.07" />
          <rect x="232" y="128" width="92" height="22" fill="currentColor" stroke="none" fillOpacity="0.07" />
          <rect x="16" y="196" width="120" height="40" fill="currentColor" stroke="none" fillOpacity="0.05" />
          {range(3).map((i) => (
            <circle
              key={i}
              cx={40 + i * 14}
              cy="268"
              r="2.2"
              fill="currentColor"
              stroke="none"
              fillOpacity="0.45"
            />
          ))}
        </>
      );

    case "route":
      return (
        <>
          {range(16).map((i) => (
            <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="300" strokeOpacity="0.1" />
          ))}
          {range(12).map((i) => (
            <line key={`h${i}`} x1="0" y1={i * 25} x2="400" y2={i * 25} strokeOpacity="0.1" />
          ))}
          <path
            d="M30 260 H100 V180 H170 V120 H240 V70 H310 V40 H370"
            strokeOpacity="0.8"
            strokeLinejoin="round"
          />
          <circle cx="30" cy="260" r="3.5" fill="currentColor" stroke="none" />
          <circle cx="370" cy="40" r="3.5" fill="none" strokeOpacity="0.9" />
          <rect x="166" y="116" width="8" height="8" fill="currentColor" stroke="none" fillOpacity="0.45" />
        </>
      );

    case "wave":
      return (
        <>
          {range(13).map((i) => {
            const y = 20 + i * 22;
            return (
              <path
                key={i}
                d={`M0 ${y} C 50 ${y - 12}, 100 ${y + 12}, 150 ${y} S 250 ${y - 12}, 300 ${y} S 380 ${y + 8}, 400 ${y}`}
                strokeOpacity={i % 3 === 0 ? 0.55 : 0.18}
              />
            );
          })}
          <line x1="228" y1="8" x2="228" y2="292" strokeOpacity="0.5" strokeDasharray="3 7" />
          <circle cx="228" cy="150" r="2.6" fill="currentColor" stroke="none" fillOpacity="0.65" />
        </>
      );

    case "blocks":
      return (
        <>
          {range(7).map((row) =>
            range(7).map((col) => {
              const filled = (row + col) % 4 === 0;
              return (
                <rect
                  key={`${row}-${col}`}
                  x={14 + col * 54}
                  y={16 + row * 39}
                  width="54"
                  height="39"
                  fill={filled ? "currentColor" : "none"}
                  fillOpacity={filled ? 0.08 : 0}
                  strokeOpacity={filled ? 0.45 : 0.16}
                />
              );
            }),
          )}
        </>
      );

    case "chunks":
      return (
        <>
          <rect x="40" y="30" width="320" height="240" strokeOpacity="0.5" />
          {range(1).map(() => null)}
          <line x1="120" y1="30" x2="120" y2="270" strokeOpacity="0.3" />
          <line x1="200" y1="30" x2="200" y2="270" strokeOpacity="0.3" />
          <line x1="280" y1="30" x2="280" y2="270" strokeOpacity="0.3" />
          <line x1="40" y1="90" x2="360" y2="90" strokeOpacity="0.3" />
          <line x1="40" y1="150" x2="360" y2="150" strokeOpacity="0.3" />
          <line x1="40" y1="210" x2="360" y2="210" strokeOpacity="0.3" />
          <rect x="120" y="90" width="80" height="60" fill="currentColor" stroke="none" fillOpacity="0.1" />
          <rect x="200" y="150" width="80" height="60" fill="currentColor" stroke="none" fillOpacity="0.1" />
          <rect x="40" y="210" width="80" height="60" fill="currentColor" stroke="none" fillOpacity="0.06" />
          <circle cx="160" cy="120" r="3" fill="currentColor" stroke="none" fillOpacity="0.6" />
        </>
      );

    case "orbit":
      return (
        <>
          {range(5).map((i) => (
            <circle
              key={i}
              cx="200"
              cy="150"
              r={34 + i * 30}
              strokeOpacity={i % 2 === 0 ? 0.55 : 0.22}
            />
          ))}
          <line x1="200" y1="10" x2="200" y2="290" strokeOpacity="0.12" />
          <line x1="20" y1="150" x2="380" y2="150" strokeOpacity="0.12" />
          <circle cx="200" cy="150" r="4" fill="currentColor" stroke="none" />
          <circle cx="200" cy="90" r="3.5" fill="currentColor" stroke="none" fillOpacity="0.7" />
          <circle cx="290" cy="150" r="3.5" fill="currentColor" stroke="none" fillOpacity="0.5" />
          <circle cx="110" cy="196" r="3.5" fill="currentColor" stroke="none" fillOpacity="0.35" />
        </>
      );

    case "stars":
    default:
      return (
        <>
          {range(7).map((row) =>
            range(9).map((col) => {
              const key = `${row}-${col}`;
              const x = 30 + col * 43;
              const y = 30 + row * 40;
              const big = (row * 9 + col) % 7 === 3;
              return big ? (
                <path
                  key={key}
                  d={`M ${x} ${y - 7} L ${x + 2.2} ${y - 2.2} L ${x + 7} ${y} L ${x + 2.2} ${y + 2.2} L ${x} ${y + 7} L ${x - 2.2} ${y + 2.2} L ${x - 7} ${y} L ${x - 2.2} ${y - 2.2} Z`}
                  fill="currentColor"
                  stroke="none"
                  fillOpacity="0.55"
                />
              ) : (
                <circle
                  key={key}
                  cx={x}
                  cy={y}
                  r={(row + col) % 5 === 0 ? 2 : 1.2}
                  fill="currentColor"
                  stroke="none"
                  fillOpacity="0.3"
                />
              );
            }),
          )}
        </>
      );
  }
}

export function PatternArt({
  variant,
  className = "",
  strokeWidth = 1,
}: {
  variant: PatternVariant;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMin slice"
      fill="none"
      aria-hidden
      className={`pattern-art ${className}`}
    >
      <g stroke="currentColor" strokeWidth={strokeWidth}>
        <Shape variant={variant} />
      </g>
    </svg>
  );
}
