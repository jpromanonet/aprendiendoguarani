export function YaguareteHero() {
  return (
    <svg
      className="home-hero-svg"
      viewBox="0 0 1400 800"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="yg-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#05251d" />
          <stop offset="45%" stopColor="#0c4535" />
          <stop offset="100%" stopColor="#17684f" />
        </linearGradient>
        <linearGradient id="yg-fur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0c56a" />
          <stop offset="45%" stopColor="#e09a3a" />
          <stop offset="100%" stopColor="#b86a1c" />
        </linearGradient>
        <linearGradient id="yg-belly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7e2b0" />
          <stop offset="100%" stopColor="#e8c07a" />
        </linearGradient>
        <radialGradient id="yg-glow" cx="72%" cy="48%" r="42%">
          <stop offset="0%" stopColor="#efc355" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#efc355" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1400" height="800" fill="url(#yg-sky)" />
      <ellipse cx="980" cy="360" rx="420" ry="320" fill="url(#yg-glow)" />

      <path
        d="M0 620 C260 560 480 680 740 600 C980 530 1180 640 1400 580 L1400 800 L0 800 Z"
        fill="#031912"
      />
      <path
        d="M0 660 C300 620 560 700 860 640 C1100 595 1260 670 1400 640"
        stroke="#3aa89a"
        strokeWidth="10"
        opacity="0.28"
        fill="none"
      />

      <g opacity="0.55" fill="#02140f">
        <path d="M20 800 C90 430 220 360 300 800 Z" />
        <path d="M1120 800 C1200 420 1320 360 1400 800 Z" />
        <ellipse cx="210" cy="160" rx="120" ry="70" />
        <ellipse cx="1240" cy="140" rx="140" ry="80" />
      </g>

      {/* Yaguareté — large, right side */}
      <g transform="translate(520 140) scale(1.15)">
        <path
          d="M430 250 C520 210 575 275 560 360 C545 320 500 265 430 280 Z"
          fill="url(#yg-fur)"
        />
        <ellipse cx="270" cy="270" rx="210" ry="115" fill="url(#yg-fur)" />
        <path
          d="M320 300 C345 355 360 410 345 450 C315 460 295 430 290 385 C282 340 295 310 320 300 Z"
          fill="#c97d28"
        />
        <path
          d="M120 285 C110 360 95 430 120 475 C155 482 180 440 188 375 C195 320 160 290 120 285 Z"
          fill="#c97d28"
        />
        <path
          d="M55 200 C15 235 25 320 90 345 C155 320 170 240 125 195 Z"
          fill="url(#yg-belly)"
        />
        <path
          d="M35 175 C-10 150 -25 95 20 60 C70 25 135 40 160 90 C185 140 125 195 70 200 Z"
          fill="url(#yg-fur)"
        />
        <path d="M80 45 L105 -5 L130 52 Z" fill="#c97d28" />
        <path d="M90 42 L105 12 L118 48 Z" fill="#2b180c" />
        <ellipse cx="28" cy="125" rx="42" ry="34" fill="url(#yg-belly)" />
        <ellipse cx="14" cy="118" rx="9" ry="7" fill="#1a120c" />
        <ellipse cx="42" cy="118" rx="9" ry="7" fill="#1a120c" />
        <path
          d="M18 142 C28 152 40 152 50 142"
          stroke="#1a120c"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="78" cy="92" rx="14" ry="11" fill="#142018" />
        <circle cx="82" cy="89" r="4.5" fill="#efc355" />
        <circle cx="84" cy="87" r="1.5" fill="#fff" />

        <g fill="#1a120c">
          <ellipse cx="200" cy="225" rx="14" ry="9" />
          <ellipse cx="250" cy="205" rx="12" ry="8" />
          <ellipse cx="300" cy="230" rx="15" ry="9" />
          <ellipse cx="340" cy="210" rx="11" ry="7" />
          <ellipse cx="185" cy="275" rx="11" ry="7" />
          <ellipse cx="270" cy="280" rx="13" ry="8" />
          <ellipse cx="330" cy="265" rx="12" ry="7" />
          <ellipse cx="115" cy="240" rx="10" ry="6" />
          <ellipse cx="90" cy="195" rx="8" ry="5" />
          <ellipse cx="135" cy="165" rx="7" ry="5" />
          <ellipse cx="500" cy="275" rx="10" ry="6" />
          <ellipse cx="540" cy="310" rx="8" ry="5" />
          <circle cx="204" cy="225" r="3.5" fill="#e09a3a" />
          <circle cx="304" cy="230" r="3.5" fill="#e09a3a" />
          <circle cx="274" cy="280" r="3" fill="#e09a3a" />
        </g>
      </g>
    </svg>
  )
}
