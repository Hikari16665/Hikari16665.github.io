/**
 * 纸面底：淡色晕染、半调网点、一条倾斜的轨道，
 * 右上角一枚很轻的行星。最上一层仍吃 --audio-level，跟音乐低频一起呼吸。
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
            cx="760"
            cy="640"
            rx="680"
            ry="170"
            stroke="#402347"
            strokeWidth="1.4"
            opacity="0.16"
            transform="rotate(-15 760 640)"
          />
          <ellipse
            cx="770"
            cy="650"
            rx="680"
            ry="170"
            stroke="#25dbc9"
            strokeWidth="1.2"
            opacity="0.33"
            transform="rotate(-15 770 650)"
          />
          <ellipse
            cx="748"
            cy="628"
            rx="660"
            ry="162"
            stroke="#f5358d"
            strokeWidth="1"
            opacity="0.24"
            transform="rotate(-13 748 628)"
          />
        </g>
      </svg>
      <svg className="corner-planet" viewBox="0 0 200 200">
        <circle cx="112" cy="104" r="58" fill="none" stroke="#f5358d" strokeWidth="3" />
        <circle cx="96" cy="90" r="58" fill="none" stroke="#25dbc9" strokeWidth="3" />
        <g clipPath="url(#corner-planet)">
          <circle cx="104" cy="96" r="56" fill="#402347" />
          <rect x="30" y="74" width="150" height="16" fill="#77389e" transform="rotate(-18 104 96)" />
          <rect x="30" y="94" width="150" height="13" fill="#ae56cc" transform="rotate(-18 104 96)" />
          <rect x="30" y="122" width="150" height="11" fill="#ef538f" transform="rotate(-18 104 96)" />
          <path d="M122 52 98 96h16L92 148l46-58h-18Z" fill="#faf6ef" />
        </g>
        <ellipse
          cx="118"
          cy="112"
          rx="86"
          ry="24"
          fill="none"
          stroke="#402347"
          strokeWidth="1.2"
          transform="rotate(-24 118 112)"
        />
        <ellipse
          cx="122"
          cy="116"
          rx="86"
          ry="24"
          fill="none"
          stroke="#25dbc9"
          strokeWidth="1"
          transform="rotate(-24 122 116)"
        />
        <path d="M168 28 171.2 38 181 41.2 171.2 44.4 168 54.4 164.8 44.4 155 41.2 164.8 38Z" fill="#39d7cc" />
        <defs>
          <clipPath id="corner-planet">
            <circle cx="104" cy="96" r="56" />
          </clipPath>
        </defs>
      </svg>
      <div className="paper-grain" />
      <span className="aurora-pulse" />
    </div>
  );
}
