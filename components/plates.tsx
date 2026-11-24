import type { ReactNode } from "react";

import type { CoverId } from "@/lib/data";

/**
 * 作品封面：同一套印刷语言里的示意图。
 * 每张都在讲那一个仓库实际在做的事——启动器、YAML 翻译、进程卡片、
 * 寻路、歌词层、共用库、强加载区块、联合封禁、这个站自己。
 * 共同的部分：纸底、套印错位、窗口饰条、站点和一条线。
 */

const PLUM = "#402347";
const BERRY = "#943363";
const PINK = "#f5358d";
const CYAN = "#25dbc9";
const BAND = "#77389e";
const PAPER = "#fffcf9";
const SOFT = "#f3e4ee";

function Echo({ d, width = 1.7 }: { d: string; width?: number }) {
  return (
    <g fill="none" strokeLinejoin="round" strokeLinecap="square">
      <path d={d} stroke={CYAN} strokeWidth={width} transform="translate(-2.4 -1.3)" />
      <path d={d} stroke={PINK} strokeWidth={width} transform="translate(2.4 1.3)" />
      <path d={d} stroke={PLUM} strokeWidth={width} />
    </g>
  );
}

function Dots({ x, y, n = 3 }: { x: number; y: number; n?: number }) {
  const fills = [PAPER, CYAN, PINK];
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x + i * 8} cy={y} r="2.15" fill={fills[i] ?? PAPER} />
      ))}
    </g>
  );
}

function Window({
  x,
  y,
  w,
  h,
  children,
  bar = 18,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  children?: ReactNode;
  bar?: number;
}) {
  return (
    <g>
      <rect x={x + 3} y={y + 3} width={w} height={h} fill="none" stroke={PINK} strokeWidth="1.2" />
      <rect x={x - 3} y={y - 2} width={w} height={h} fill="none" stroke={CYAN} strokeWidth="1.2" />
      <rect x={x} y={y} width={w} height={h} fill={PAPER} stroke={PLUM} strokeWidth="1.5" />
      <rect x={x} y={y} width={w} height={bar} fill={PLUM} />
      <Dots x={x + 10} y={y + bar / 2} />
      {children}
    </g>
  );
}

/** 等轴方块：启动器里的「一个服务器」。 */
function Cube({ x, y, s }: { x: number; y: number; s: number }) {
  const h = s * 0.5;
  const d = s * 0.66;
  const top = `M ${x} ${y} L ${x + s} ${y + h} L ${x} ${y + h * 2} L ${x - s} ${y + h} Z`;
  const left = `M ${x - s} ${y + h} L ${x} ${y + h * 2} L ${x} ${y + h * 2 + d} L ${x - s} ${y + h + d} Z`;
  const right = `M ${x + s} ${y + h} L ${x} ${y + h * 2} L ${x} ${y + h * 2 + d} L ${x + s} ${y + h + d} Z`;
  return (
    <g>
      <path d={left} fill={PLUM} />
      <path d={right} fill={BERRY} />
      <path d={top} fill={BAND} />
      <path d={top} fill="none" stroke={CYAN} strokeWidth="1.2" transform="translate(-1.6 -1)" />
      <path
        d={`M ${x - s * 0.45} ${y + h * 0.85} l ${s * 0.28} ${h * 0.28} M ${x - s * 0.1} ${y + h * 0.55} l ${s * 0.34} ${h * 0.34} M ${x + s * 0.22} ${y + h * 0.78} l ${s * 0.22} ${h * 0.22}`}
        fill="none"
        stroke={CYAN}
        strokeWidth="2.2"
        strokeLinecap="square"
      />
    </g>
  );
}

function Halftone() {
  const dots = [];
  for (let r = 0; r < 5; r += 1) {
    for (let c = 0; c < 7; c += 1) {
      const t = 1 - (c * 0.7 + r) / 9;
      if (t < 0.18) continue;
      dots.push(
        <circle
          key={`${c}-${r}`}
          cx={16 + c * 6}
          cy={128 + r * 5}
          r="1.05"
          fill={PLUM}
          opacity={0.18 + t * 0.55}
        />,
      );
    }
  }
  return <g>{dots}</g>;
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 440 156" className="plate-art" aria-hidden>
      <rect width="440" height="168" fill={PAPER} />
      <Halftone />
      {children}
      <g fill="none" stroke={PLUM} strokeWidth="1.15">
        <path d="M424 14 v10 M419 19 h10" />
        <circle cx="424" cy="19" r="2.2" />
      </g>
    </svg>
  );
}

/** 多实例服务器启动器：两枚方块，旁边一份实例列表，其中一个正在跑。 */
function Launcher() {
  return (
    <Frame>
      <Cube x={78} y={30} s={30} />
      <Cube x={112} y={46} s={44} />
      <Window x={214} y={26} w={188} h={114}>
        <circle cx={386} cy={35} r="3" fill={CYAN} />
        <line x1="232" y1="64" x2="232" y2="112" stroke="#cbb8c8" strokeWidth="1.4" />
        {[0, 1, 2].map((i) => {
          const y = 56 + i * 24;
          const on = i === 0;
          return (
            <g key={i}>
              <circle cx="232" cy={y + 8} r={on ? 4.2 : 3} fill={on ? BERRY : PAPER} stroke={PLUM} strokeWidth="1.3" />
              <rect x="246" y={y} width="140" height="16" fill={on ? SOFT : "none"} stroke={PLUM} strokeOpacity={on ? 1 : 0.35} />
              {on && <path d={`M 254 ${y + 3.5} v 9 l 8 -4.5 z`} fill={BERRY} />}
              <path d={`M ${on ? 272 : 256} ${y + 8} h ${on ? 78 : 92}`} stroke={PLUM} strokeOpacity={on ? 0.8 : 0.35} strokeWidth="1.4" />
            </g>
          );
        })}
      </Window>
    </Frame>
  );
}

/** Baritone 寻路 + Carpet 服务端指令：格子上的一条折线，底下一条红石。 */
function Baritone() {
  const ox = 24;
  const oy = 18;
  const cw = 38;
  const ch = 30;
  const cell = (col: number, row: number) => [ox + col * cw + cw / 2, oy + row * ch + ch / 2];
  const blocks = new Set(["0,0", "2,0", "4,0", "6,0", "2,2", "4,2"]);
  const path = [
    [0, 2],
    [1, 2],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [5, 2],
    [6, 2],
  ];
  const d = path
    .map((p, i) => {
      const [x, y] = cell(p[0], p[1]);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
  const [sx, sy] = cell(0, 2);
  const [ex, ey] = cell(6, 2);

  return (
    <Frame>
      {Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 7 }, (_, col) => {
          const blocked = blocks.has(`${col},${row}`);
          return (
            <rect
              key={`${col}-${row}`}
              x={ox + col * cw + 3}
              y={oy + row * ch + 3}
              width={cw - 6}
              height={ch - 6}
              fill={blocked ? PLUM : "none"}
              stroke={PLUM}
              strokeOpacity={blocked ? 0.9 : 0.18}
            />
          );
        }),
      )}
      <Echo d={d} width={2.3} />
      <circle cx={sx} cy={sy} r="5" fill={BERRY} />
      <path d={`M ${ex} ${ey - 6} l 5 6 l -5 6 l -5 -6 z`} fill={CYAN} stroke={PLUM} strokeWidth="1" />
      <path d="M 36 128 H 168" stroke={PINK} strokeWidth="1.6" strokeDasharray="1.5 7" strokeLinecap="round" />
      <rect x="24" y="122" width="8" height="12" fill={BERRY} />
      <rect x="34" y="126" width="16" height="4" fill={PINK} />
      <Window x={312} y={28} w={100} h={96} bar={16}>
        <text
          x="362"
          y="78"
          textAnchor="middle"
          fill={PLUM}
          fontFamily="var(--font-display), sans-serif"
          fontSize="28"
          fontStyle="italic"
          fontWeight="800"
        >
          /
        </text>
        <path d="M 330 96 h 64 M 338 108 h 48" stroke={PLUM} strokeOpacity="0.45" strokeWidth="1.5" />
      </Window>
    </Frame>
  );
}

/** 桌面歌词铺在聊天窗口背后：当前一行是品红，其余是待唱的句子。 */
function Lyrics() {
  const lines = [228, 168, 384, 132, 196];
  return (
    <Frame>
      {lines.map((w, i) => {
        const y = 30 + i * 22;
        const on = i === 2;
        return (
          <g key={i}>
            {on && (
              <>
                <rect x="46" y={y} width={w} height="12" fill={CYAN} transform="translate(-2.4 -1.2)" />
                <rect x="46" y={y} width={w} height="12" fill={PINK} transform="translate(2.2 1.2)" />
              </>
            )}
            <rect x="46" y={y} width={w} height="12" fill={on ? PINK : PLUM} opacity={on ? 1 : 0.18 + (i % 2) * 0.08} />
            {on && <path d={`M 32 ${y + 1} v 10 l 8 -5 z`} fill={BERRY} />}
          </g>
        );
      })}
      <line x1="30" y1="22" x2="30" y2="132" stroke={BERRY} strokeWidth="1.3" />
      <Window x={250} y={36} w={156} h={96} bar={16}>
        <rect x="264" y="62" width="92" height="14" rx="7" fill={SOFT} />
        <rect x="286" y="82" width="104" height="14" rx="7" fill="#efe4f2" />
        <rect x="264" y="102" width="70" height="12" rx="6" fill={SOFT} />
      </Window>
    </Frame>
  );
}

/** 几个插件插在同一条基础库上。 */
function Library() {
  const cards = [36, 168, 300];
  const glyphs = [
    "M 78 46 l 22 12 l -22 12 l -22 -12 z M 56 58 v 24 l 22 12 v -24 M 100 58 v 24",
    "M 196 48 h 52 M 196 62 h 40 M 196 76 h 52 M 196 90 h 28",
    "M 318 46 h 22 v 22 h -22 z M 346 46 h 22 v 22 h -22 z M 318 74 h 22 v 22 h -22 z M 346 74 h 22 v 22 h -22 z",
  ];
  return (
    <Frame>
      <path d="M 48 118 H 392" stroke={CYAN} strokeWidth="3" transform="translate(-2 0)" />
      <path d="M 48 118 H 392" stroke={PINK} strokeWidth="1.6" transform="translate(2 1.5)" />
      <rect x="40" y="116" width="360" height="22" fill={PLUM} />
      <text
        x="372"
        y="132"
        textAnchor="end"
        fill={PAPER}
        fontFamily="var(--font-display), sans-serif"
        fontSize="12"
        fontStyle="italic"
        fontWeight="800"
        letterSpacing="1.5"
      >
        LIB
      </text>
      {cards.map((x, i) => (
        <g key={x}>
          <line x1={x + 48} y1="108" x2={x + 48} y2="116" stroke={PLUM} strokeWidth="1.5" />
          <circle cx={x + 48} cy="116" r="3.2" fill={i === 1 ? CYAN : PAPER} stroke={PLUM} strokeWidth="1.2" />
          <rect x={x + 3} y={32} width="96" height="76" fill="none" stroke={PINK} strokeWidth="1.15" />
          <rect x={x - 3} y={28} width="96" height="76" fill="none" stroke={CYAN} strokeWidth="1.15" />
          <rect x={x} y={30} width="96" height="76" fill={PAPER} stroke={PLUM} strokeWidth="1.5" />
          <path d={glyphs[i]} fill="none" stroke={i === 1 ? BERRY : PLUM} strokeWidth="1.7" />
        </g>
      ))}
    </Frame>
  );
}

/** 一排区块：钉住的是强加载，带一枚星币的是买下来的。 */
function Forceload() {
  const tiles = [
    { pin: false, owned: false, coin: false, dash: false },
    { pin: true, owned: true, coin: false, dash: false },
    { pin: false, owned: false, coin: false, dash: false },
    { pin: true, owned: true, coin: true, dash: false },
    { pin: false, owned: false, coin: false, dash: true },
    { pin: false, owned: false, coin: false, dash: false },
  ];
  return (
    <Frame>
      <path d="M 52 118 H 388" stroke={PLUM} strokeOpacity="0.35" strokeWidth="1.4" />
      {tiles.map((tile, i) => {
        const x = 28 + i * 66;
        const y = 36;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width="54"
              height="54"
              fill={tile.owned ? PLUM : PAPER}
              stroke={tile.dash ? BERRY : PLUM}
              strokeWidth="1.5"
              strokeDasharray={tile.dash ? "4 3" : undefined}
              strokeOpacity={tile.owned || tile.dash ? 1 : 0.28}
            />
            {tile.pin && (
              <g>
                <line x1={x + 27} y1="118" x2={x + 27} y2="90" stroke={CYAN} strokeWidth="1.6" />
                <circle cx={x + 27} cy="118" r="3.4" fill={CYAN} stroke={PLUM} strokeWidth="1" />
                <path d={`M ${x + 27} 30 l 4 7 h -8 z`} fill={BERRY} />
              </g>
            )}
            {tile.coin && (
              <g>
                <circle cx={x + 40} cy={y + 40} r="12" fill={PAPER} stroke={PLUM} strokeWidth="1.5" />
                <circle cx={x + 43} cy={y + 42} r="12" fill="none" stroke={PINK} strokeWidth="1.2" />
                <path d={`M ${x + 40} ${y + 34} l 1.6 4.2 h 4.4 l -3.5 2.7 1.3 4.3 -3.8 -2.6 -3.8 2.6 1.3 -4.3 -3.5 -2.7 h 4.4 z`} fill={BERRY} />
              </g>
            )}
          </g>
        );
      })}
    </Frame>
  );
}

/** 前端和后端两台机器，中间一枚封禁章，禁令沿着线传过去。 */
function Union() {
  return (
    <Frame>
      <path d="M 154 86 H 186" stroke={CYAN} strokeWidth="1.7" transform="translate(0 -1.4)" />
      <path d="M 254 86 H 286" stroke={PINK} strokeWidth="1.7" transform="translate(0 1.4)" />
      <path d="M 154 86 H 286" stroke={PLUM} strokeWidth="1.7" />
      <Window x={24} y={40} w={130} h={88} bar={16}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx="46" cy={70 + i * 16} r="4" fill={i === 2 ? BERRY : "none"} stroke={PLUM} strokeWidth="1.3" />
            <path d={`M 58 ${70 + i * 16} h ${i === 2 ? 36 : 58}`} stroke={PLUM} strokeOpacity={i === 2 ? 0.9 : 0.35} />
            {i === 2 && (
              <path d={`M 100 ${66 + i * 16} l 8 8 M 108 ${66 + i * 16} l -8 8`} stroke={BERRY} strokeWidth="1.6" />
            )}
          </g>
        ))}
      </Window>
      <Window x={286} y={40} w={130} h={88} bar={16}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx="308" cy={70 + i * 16} r="4" fill={i === 2 ? BERRY : "none"} stroke={PLUM} strokeWidth="1.3" />
            <path d={`M 320 ${70 + i * 16} h ${i === 2 ? 36 : 58}`} stroke={PLUM} strokeOpacity={i === 2 ? 0.9 : 0.35} />
            {i === 2 && (
              <path d={`M 362 ${66 + i * 16} l 8 8 M 370 ${66 + i * 16} l -8 8`} stroke={BERRY} strokeWidth="1.6" />
            )}
          </g>
        ))}
      </Window>
      <circle cx="220" cy="86" r="24" fill="none" stroke={CYAN} strokeWidth="1.5" transform="translate(-2.2 -1.2)" />
      <circle cx="220" cy="86" r="24" fill="none" stroke={PINK} strokeWidth="1.5" transform="translate(2.2 1.2)" />
      <circle cx="220" cy="86" r="24" fill={PAPER} stroke={PLUM} strokeWidth="1.6" />
      <path d="M 206 72 L 234 100" stroke={BERRY} strokeWidth="3" />
    </Frame>
  );
}

/** 这个站：浏览器里的错版字，加上开场那一排星。 */
function Site() {
  const stars = [78, 108, 138, 168, 198];
  return (
    <Frame>
      <Window x={28} y={20} w={384} h={124} bar={18}>
        <rect x="108" y="25" width="150" height="8" rx="4" fill="#6a4a66" />
        {stars.map((x, i) => {
          const lit = i === 2 || i === 3;
          const s = lit ? 6 : 3.2;
          return (
            <path
              key={x}
              d={`M ${x} ${48 - s} l ${s * 0.35} ${s * 0.7} h ${s * 0.75} l ${-s * 0.6} ${s * 0.48} l ${s * 0.22} ${s * 0.74} l ${-s * 0.72} ${-s * 0.42} l ${-s * 0.72} ${s * 0.42} l ${s * 0.22} ${-s * 0.74} l ${-s * 0.6} ${-s * 0.48} h ${s * 0.75} z`}
              fill={lit ? (i % 2 === 0 ? CYAN : PINK) : "#cbb8c8"}
            />
          );
        })}
        <text
          x="70"
          y="118"
          fill={CYAN}
          fontFamily="var(--font-display), sans-serif"
          fontSize="42"
          fontStyle="italic"
          fontWeight="800"
          transform="translate(-3 -1)"
        >
          Nya
        </text>
        <text
          x="70"
          y="118"
          fill={PINK}
          fontFamily="var(--font-display), sans-serif"
          fontSize="42"
          fontStyle="italic"
          fontWeight="800"
          transform="translate(3 1.4)"
        >
          Nya
        </text>
        <text
          x="70"
          y="118"
          fill={PLUM}
          fontFamily="var(--font-display), sans-serif"
          fontSize="42"
          fontStyle="italic"
          fontWeight="800"
        >
          Nya
        </text>
        <g>
          <circle cx="354" cy="98" r="16" fill="none" stroke={PINK} strokeWidth="1.3" />
          <circle cx="346" cy="90" r="16" fill="none" stroke={CYAN} strokeWidth="1.3" />
          <g clipPath="url(#site-planet)">
            <circle cx="350" cy="94" r="15" fill={PLUM} />
            <path d="M 332 88 h 36" stroke={BAND} strokeWidth="5" />
            <path d="M 332 96 h 36" stroke="#ae56cc" strokeWidth="3.5" />
            <path d="M 334 104 h 32" stroke={PINK} strokeWidth="2.5" />
            <path d="M 356 80 l -4 10 h 4 l -3 12 10 -14 h -4 z" fill={PAPER} />
          </g>
          <defs>
            <clipPath id="site-planet">
              <circle cx="350" cy="94" r="15" />
            </clipPath>
          </defs>
        </g>
      </Window>
    </Frame>
  );
}

/** 左右各一份 YAML，中间翻译过去；两边都留着同一枚 {0}。 */
function Token({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x + 2.2} y={y + 1.4} width={32} height={14} rx={2} fill="none" stroke={PINK} strokeWidth={1.15} />
      <rect x={x - 2.2} y={y - 1.2} width={32} height={14} rx={2} fill="none" stroke={CYAN} strokeWidth={1.15} />
      <rect x={x} y={y} width={32} height={14} rx={2} fill={PAPER} stroke={BERRY} strokeWidth={1.4} />
      <text
        x={x + 16}
        y={y + 11}
        textAnchor="middle"
        fill={PLUM}
        fontFamily="var(--font-display), sans-serif"
        fontSize="10"
        fontWeight="700"
      >
        {"{0}"}
      </text>
    </g>
  );
}

function Yaml() {
  const source = [
    { x: 40, y: 52, w: 86 },
    { x: 54, y: 74, w: 28 },
    { x: 68, y: 96, w: 64 },
    { x: 54, y: 116, w: 48 },
  ];
  const translated = [
    { x: 268, y: 50, w: 108 },
    { x: 282, y: 72, w: 22 },
    { x: 296, y: 94, w: 52 },
    { x: 282, y: 114, w: 70 },
  ];
  return (
    <Frame>
      <rect x={30} y={30} width={156} height={106} fill="none" stroke={PINK} strokeWidth={1.15} transform="translate(2.2 1.4)" />
      <rect x={26} y={26} width={156} height={106} fill="none" stroke={CYAN} strokeWidth={1.15} transform="translate(-2 -1.2)" />
      <rect x={28} y={28} width={156} height={106} fill={PAPER} stroke={PLUM} strokeWidth={1.5} />
      <path d="M 148 28 h 36 v 14 h -14 z" fill={PLUM} />
      {source.map((row) => (
        <path key={`s-${row.y}`} d={`M ${row.x} ${row.y} h ${row.w}`} stroke={PLUM} strokeWidth={3} strokeLinecap="square" />
      ))}
      <Token x={90} y={66} />
      <Echo d="M 196 80 H 236" width={2} />
      <circle cx={196} cy={80} r={4} fill={BERRY} />
      <path d="M 228 74 l 10 6 l -10 6" fill="none" stroke={PLUM} strokeWidth={1.6} />
      <Window x={248} y={20} w={168} h={118} bar={16}>
        {translated.map((row) => (
          <path key={`t-${row.y}`} d={`M ${row.x} ${row.y} h ${row.w}`} stroke={PLUM} strokeWidth={3} strokeLinecap="square" opacity={0.85} />
        ))}
        <Token x={312} y={64} />
      </Window>
    </Frame>
  );
}

/** 桌面右下角两张卡片：青的是进程起来，浆果色的是退出。 */
function Proc() {
  return (
    <Frame>
      <Window x={22} y={16} w={396} h={124} bar={16}>
        <path d="M 36 124 H 400" stroke={PLUM} strokeOpacity={0.18} strokeWidth={1.2} />
        <line x1={268} y1={58} x2={268} y2={102} stroke={PLUM} strokeWidth={1.4} />
        <g>
          <rect x={286} y={86} width={112} height={26} rx={4} fill={PINK} fillOpacity={0.22} />
          <rect x={284} y={84} width={112} height={26} rx={4} fill={PAPER} stroke={BERRY} strokeWidth={1.5} />
          <circle cx={268} cy={97} r={4} fill={BERRY} stroke={PLUM} strokeWidth={1.1} />
          <path d="M 298 97 h 62" stroke={PLUM} strokeOpacity={0.45} strokeWidth={2.4} strokeLinecap="square" />
        </g>
        <g>
          <rect x={252} y={40} width={142} height={38} rx={8} fill={CYAN} fillOpacity={0.28} />
          <rect x={260} y={46} width={132} height={30} rx={4} fill="none" stroke={PINK} strokeWidth={1.2} transform="translate(2 1.2)" />
          <rect x={256} y={44} width={132} height={30} rx={4} fill="none" stroke={CYAN} strokeWidth={1.2} transform="translate(-2 -1)" />
          <rect x={258} y={45} width={132} height={30} rx={4} fill={PAPER} stroke={PLUM} strokeWidth={1.5} />
          <circle cx={268} cy={60} r={4.4} fill={CYAN} stroke={PLUM} strokeWidth={1.1} />
          <path d="M 280 60 h 78" stroke={PLUM} strokeWidth={2.6} strokeLinecap="square" />
        </g>
      </Window>
    </Frame>
  );
}

const drawings: Record<CoverId, () => ReactNode> = {
  launcher: Launcher,
  yaml: Yaml,
  proc: Proc,
  baritone: Baritone,
  lyrics: Lyrics,
  library: Library,
  forceload: Forceload,
  union: Union,
  site: Site,
};

export function ProjectPlate({ id }: { id: CoverId }) {
  const Draw = drawings[id] ?? Site;
  return (
    <div className="plate">
      <Draw />
    </div>
  );
}
