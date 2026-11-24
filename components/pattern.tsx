import { useId } from "react";

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

function sparkle(x: number, y: number, s: number) {
  const k = s * 0.22;
  return `M ${x} ${y - s} L ${x + k} ${y - k} L ${x + s} ${y} L ${x + k} ${y + k} L ${x} ${y + s} L ${x - k} ${y + k} L ${x - s} ${y} L ${x - k} ${y - k} Z`;
}

function Halftone({
  x,
  y,
  cols,
  rows,
  gap = 7,
}: {
  x: number;
  y: number;
  cols: number;
  rows: number;
  gap?: number;
}) {
  const dots = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const t = 1 - (c + r) / (cols + rows - 2);
      if (t < 0.12) continue;
      dots.push(
        <circle
          key={`${c}-${r}`}
          cx={x + c * gap}
          cy={y + r * gap}
          r="1"
          fill="var(--p-dot)"
          fillOpacity={0.18 + t * 0.72}
          stroke="none"
        />,
      );
    }
  }
  return <>{dots}</>;
}

function EchoPath({ d, width = 1.7 }: { d: string; width?: number }) {
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke="var(--p-ghost-cyan)"
        strokeWidth={width}
        strokeLinejoin="round"
        transform="translate(-3.2 -1.8)"
      />
      <path
        d={d}
        fill="none"
        stroke="var(--p-ghost-pink)"
        strokeWidth={width}
        strokeLinejoin="round"
        transform="translate(3 1.6)"
      />
      <path d={d} fill="none" stroke="var(--p-ink)" strokeWidth={width} strokeLinejoin="round" />
    </>
  );
}

function Planet({
  uid,
  cx,
  cy,
  r,
}: {
  uid: string;
  cx: number;
  cy: number;
  r: number;
}) {
  const clip = `${uid}-planet`;
  return (
    <>
      <circle cx={cx + 7} cy={cy + 6} r={r + 1} fill="none" stroke="var(--p-ghost-pink)" strokeWidth="3" />
      <circle cx={cx - 7} cy={cy - 6} r={r + 1} fill="none" stroke="var(--p-ghost-cyan)" strokeWidth="3" />
      <g clipPath={`url(#${clip})`}>
        <circle cx={cx} cy={cy} r={r} fill="var(--p-plum)" />
        <rect
          x={cx - r - 8}
          y={cy - r * 0.42}
          width={r * 2 + 16}
          height={r * 0.28}
          fill="var(--p-band)"
          transform={`rotate(-16 ${cx} ${cy})`}
        />
        <rect
          x={cx - r - 8}
          y={cy - r * 0.08}
          width={r * 2 + 16}
          height={r * 0.22}
          fill="var(--p-soft)"
          transform={`rotate(-16 ${cx} ${cy})`}
        />
        <rect
          x={cx - r - 8}
          y={cy + r * 0.34}
          width={r * 2 + 16}
          height={r * 0.18}
          fill="var(--p-pink)"
          transform={`rotate(-16 ${cx} ${cy})`}
        />
        <path
          d={`M ${cx + r * 0.28} ${cy - r * 0.72} L ${cx - r * 0.08} ${cy - r * 0.02} H ${cx + r * 0.16} L ${cx - r * 0.16} ${cy + r * 0.78} L ${cx + r * 0.55} ${cy - r * 0.12} H ${cx + r * 0.22} Z`}
          fill="var(--p-paper)"
          stroke="none"
        />
      </g>
      <defs>
        <clipPath id={clip}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>
    </>
  );
}

function Shape({ variant, uid }: { variant: PatternVariant; uid: string }) {
  switch (variant) {
    case "arcs":
      return (
        <>
          <Planet uid={uid} cx={158} cy={142} r={74} />
          <g fill="none">
            <ellipse cx="214" cy="168" rx="148" ry="42" stroke="var(--p-ink)" strokeWidth="1.5" transform="rotate(-22 214 168)" />
            <ellipse cx="220" cy="174" rx="148" ry="42" stroke="var(--p-ghost-cyan)" strokeWidth="1.35" transform="rotate(-22 220 174)" />
            <ellipse cx="208" cy="162" rx="140" ry="38" stroke="var(--p-ghost-pink)" strokeWidth="1.2" transform="rotate(-20 208 162)" />
          </g>
          <path d={sparkle(292, 46, 9)} fill="var(--p-ghost-cyan)" stroke="none" />
          <path d={sparkle(312, 72, 4)} fill="var(--p-ghost-pink)" stroke="none" />
          <circle cx="78" cy="214" r="3.2" fill="var(--p-ghost-cyan)" stroke="none" />
          <circle cx="336" cy="132" r="2.4" fill="var(--p-pink)" stroke="none" />
          <Halftone x={196} y={188} cols={14} rows={9} gap={6} />
        </>
      );

    case "stack":
      return (
        <>
          <rect x="8" y="16" width="384" height="268" fill="none" stroke="var(--p-ghost-cyan)" strokeWidth="1.4" transform="translate(-3 -2)" />
          <rect x="8" y="16" width="384" height="268" fill="none" stroke="var(--p-ghost-pink)" strokeWidth="1.4" transform="translate(3 2)" />
          <rect x="8" y="16" width="384" height="268" fill="none" stroke="var(--p-ink)" strokeWidth="1.2" />
          <rect x="8" y="16" width="5" height="268" fill="var(--p-ghost-cyan)" stroke="none" />
          {range(16).map((i) => (
            <line
              key={i}
              x1="28"
              x2={i % 4 === 0 ? 250 : 196 + (i % 5) * 18}
              y1={32 + i * 16}
              y2={32 + i * 16}
              stroke="var(--p-ink)"
              strokeWidth="1.15"
              strokeOpacity={i % 2 === 0 ? 0.85 : 0.35}
            />
          ))}
          <g clipPath={`url(#${uid}-slice)`}>
            <rect x="248" y="16" width="144" height="268" fill="var(--p-plum)" stroke="none" />
            <rect x="230" y="70" width="180" height="22" fill="var(--p-band)" transform="rotate(-18 320 150)" stroke="none" />
            <rect x="230" y="108" width="180" height="16" fill="var(--p-soft)" transform="rotate(-18 320 150)" stroke="none" />
            <rect x="230" y="168" width="180" height="14" fill="var(--p-pink)" transform="rotate(-18 320 150)" stroke="none" />
          </g>
          <Halftone x={28} y={214} cols={10} rows={6} gap={6} />
          <path d={sparkle(300, 48, 6)} fill="var(--p-paper)" stroke="none" />
          <defs>
            <clipPath id={`${uid}-slice`}>
              <polygon points="268,16 392,16 392,284 236,284" />
            </clipPath>
          </defs>
        </>
      );

    case "route":
      return (
        <>
          {range(16).map((i) => (
            <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="300" stroke="var(--p-ink)" strokeOpacity="0.12" />
          ))}
          {range(12).map((i) => (
            <line key={`h${i}`} x1="0" y1={i * 25} x2="400" y2={i * 25} stroke="var(--p-ink)" strokeOpacity="0.12" />
          ))}
          <EchoPath d="M30 250 H110 V176 H176 V118 H246 V68 H318 V36 H372" />
          <rect x="18" y="238" width="26" height="16" fill="var(--p-plum)" stroke="none" />
          <rect x="18" y="238" width="3" height="16" fill="var(--p-ghost-cyan)" stroke="none" />
          <circle cx="372" cy="36" r="4" fill="none" stroke="var(--p-ink)" strokeWidth="1.4" />
          <circle cx="176" cy="118" r="3" fill="var(--p-pink)" stroke="none" />
          <Halftone x={300} y={200} cols={9} rows={7} gap={6} />
          <path d={sparkle(250, 52, 5)} fill="var(--p-ghost-cyan)" stroke="none" />
        </>
      );

    case "wave":
      return (
        <>
          {range(12).map((i) => {
            const y = 28 + i * 22;
            const d = `M0 ${y} C 50 ${y - 14}, 100 ${y + 14}, 150 ${y} S 250 ${y - 14}, 300 ${y} S 380 ${y + 8}, 400 ${y}`;
            const strong = i % 3 === 0;
            return (
              <g key={i}>
                {strong && (
                  <path d={d} fill="none" stroke="var(--p-ghost-cyan)" strokeWidth="1.4" transform="translate(-3 -1.5)" />
                )}
                {strong && (
                  <path d={d} fill="none" stroke="var(--p-ghost-pink)" strokeWidth="1.3" transform="translate(3 1.4)" />
                )}
                <path
                  d={d}
                  fill="none"
                  stroke="var(--p-ink)"
                  strokeWidth={strong ? 1.5 : 1}
                  strokeOpacity={strong ? 0.9 : 0.28}
                />
              </g>
            );
          })}
          <line x1="236" y1="10" x2="236" y2="290" stroke="var(--p-pink)" strokeWidth="1.2" strokeDasharray="3 7" />
          <path d={sparkle(236, 150, 6)} fill="var(--p-plum)" stroke="none" />
          <Halftone x={300} y={36} cols={10} rows={8} gap={6} />
        </>
      );

    case "blocks":
      return (
        <>
          {range(7).map((row) =>
            range(7).map((col) => {
              const n = (row * 3 + col * 5) % 7;
              const fill =
                n === 0 ? "var(--p-plum)" : n === 1 ? "var(--p-band)" : n === 2 ? "var(--p-pink)" : "none";
              return (
                <rect
                  key={`${row}-${col}`}
                  x={16 + col * 54}
                  y={14 + row * 40}
                  width="54"
                  height="40"
                  fill={fill}
                  fillOpacity={fill === "none" ? 0 : 0.9}
                  stroke="var(--p-ink)"
                  strokeOpacity={fill === "none" ? 0.2 : 0.45}
                />
              );
            }),
          )}
          <path d="M16 250 L384 40" stroke="var(--p-ghost-cyan)" strokeWidth="6" opacity="0.55" />
          <path d="M16 262 L384 52" stroke="var(--p-ghost-pink)" strokeWidth="3" opacity="0.7" />
          <Halftone x={300} y={200} cols={8} rows={6} gap={6} />
          <path d={sparkle(48, 40, 5)} fill="var(--p-paper)" stroke="none" />
        </>
      );

    case "chunks":
      return (
        <>
          <rect x="36" y="28" width="328" height="244" fill="none" stroke="var(--p-ink)" strokeWidth="1.4" />
          <rect x="40" y="32" width="320" height="236" fill="none" stroke="var(--p-ghost-cyan)" strokeWidth="1.2" transform="translate(-3 -2)" />
          <rect x="32" y="24" width="320" height="236" fill="none" stroke="var(--p-ghost-pink)" strokeWidth="1.2" transform="translate(3 2)" />
          {[118, 200, 282].map((x) => (
            <line key={`v${x}`} x1={x} y1="28" x2={x} y2="272" stroke="var(--p-ink)" strokeOpacity="0.35" />
          ))}
          {[90, 152, 214].map((y) => (
            <line key={`h${y}`} x1="36" y1={y} x2="364" y2={y} stroke="var(--p-ink)" strokeOpacity="0.35" />
          ))}
          <g clipPath={`url(#${uid}-cell)`}>
            <rect x="118" y="90" width="82" height="62" fill="var(--p-plum)" stroke="none" />
            <rect x="100" y="96" width="120" height="12" fill="var(--p-band)" transform="rotate(-16 160 120)" stroke="none" />
            <rect x="100" y="116" width="120" height="9" fill="var(--p-soft)" transform="rotate(-16 160 120)" stroke="none" />
            <rect x="100" y="136" width="120" height="8" fill="var(--p-pink)" transform="rotate(-16 160 120)" stroke="none" />
          </g>
          <rect x="200" y="152" width="82" height="62" fill="var(--p-band)" fillOpacity="0.35" stroke="none" />
          <rect x="200" y="152" width="4" height="62" fill="var(--p-ghost-cyan)" stroke="none" />
          <Halftone x={40} y={218} cols={10} rows={6} gap={6} />
          <path d={sparkle(160, 118, 5)} fill="var(--p-paper)" stroke="none" />
          <defs>
            <clipPath id={`${uid}-cell`}>
              <rect x="118" y="90" width="82" height="62" />
            </clipPath>
          </defs>
        </>
      );

    case "orbit":
      return (
        <>
          <Planet uid={uid} cx={200} cy={150} r={28} />
          <g fill="none">
            {[0, 1, 2, 3].map((i) => (
              <ellipse
                key={i}
                cx={200 + i * 4}
                cy={150 + i * 3}
                rx={46 + i * 32}
                ry={16 + i * 10}
                stroke={i % 2 === 0 ? "var(--p-ink)" : "var(--p-ghost-cyan)"}
                strokeWidth="1.35"
                opacity={i % 2 === 0 ? 0.9 : 0.75}
                transform={`rotate(${-18 - i * 4} ${200 + i * 4} ${150 + i * 3})`}
              />
            ))}
            <ellipse cx="192" cy="142" rx="128" ry="46" stroke="var(--p-ghost-pink)" strokeWidth="1.2" transform="rotate(-12 192 142)" />
          </g>
          <path d={sparkle(200, 78, 5)} fill="var(--p-ghost-cyan)" stroke="none" />
          <path d={sparkle(292, 126, 4.5)} fill="var(--p-ghost-pink)" stroke="none" />
          <path d={sparkle(118, 196, 4)} fill="var(--p-pink)" stroke="none" />
          <Halftone x={300} y={200} cols={9} rows={7} gap={6} />
        </>
      );

    case "stars":
    default:
      return (
        <>
          <ellipse cx="250" cy="210" rx="150" ry="36" fill="none" stroke="var(--p-ink)" strokeWidth="1.2" transform="rotate(-18 250 210)" />
          <ellipse cx="256" cy="216" rx="150" ry="36" fill="none" stroke="var(--p-ghost-cyan)" strokeWidth="1.1" transform="rotate(-18 256 216)" />
          <ellipse cx="244" cy="204" rx="140" ry="32" fill="none" stroke="var(--p-ghost-pink)" strokeWidth="1" transform="rotate(-16 244 204)" />
          {range(6).map((row) =>
            range(8).map((col) => {
              const x = 36 + col * 46;
              const y = 32 + row * 44;
              const big = (row * 5 + col * 3) % 7 === 2;
              const color = (row + col) % 2 === 0 ? "var(--p-ghost-cyan)" : "var(--p-ghost-pink)";
              return big ? (
                <path key={`${row}-${col}`} d={sparkle(x, y, 7)} fill={color} stroke="none" />
              ) : (
                <circle
                  key={`${row}-${col}`}
                  cx={x}
                  cy={y}
                  r={(row + col) % 4 === 0 ? 2 : 1.15}
                  fill="var(--p-ink)"
                  fillOpacity="0.45"
                  stroke="none"
                />
              );
            }),
          )}
          <Halftone x={250} y={36} cols={12} rows={6} gap={6} />
        </>
      );
  }
}

export function PatternArt({
  variant,
  className = "",
}: {
  variant: PatternVariant;
  className?: string;
  /** 保留旧调用签名；线宽改由图案自己决定 */
  strokeWidth?: number;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden
      className={`pattern-art ${className}`}
    >
      <Shape variant={variant} uid={uid} />
    </svg>
  );
}
