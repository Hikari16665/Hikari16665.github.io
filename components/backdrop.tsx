/**
 * 纸面底：淡色晕染、半调网点、贴着页脚的一条轨道。
 * 行星不再占右上角，免得压住标题。最上一层仍吃 --audio-level。
 */
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden>
      <div className="wash" />
      <div className="halftone halftone-tr" />
      <div className="halftone halftone-bl" />
      <svg className="orbit-watermark" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g fill="none">
          <ellipse
            cx="720"
            cy="860"
            rx="760"
            ry="150"
            stroke="#402347"
            strokeWidth="1.4"
            opacity="0.14"
            transform="rotate(-8 720 860)"
          />
          <ellipse
            cx="732"
            cy="872"
            rx="760"
            ry="150"
            stroke="#25dbc9"
            strokeWidth="1.2"
            opacity="0.28"
            transform="rotate(-8 732 872)"
          />
          <ellipse
            cx="708"
            cy="848"
            rx="730"
            ry="140"
            stroke="#f5358d"
            strokeWidth="1"
            opacity="0.2"
            transform="rotate(-6 708 848)"
          />
        </g>
      </svg>
      <div className="paper-grain" />
      <span className="aurora-pulse" />
    </div>
  );
}
