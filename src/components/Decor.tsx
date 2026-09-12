import type { CSSProperties } from "react";

/** Bintang kecil berkelap-kelip di latar belakang */
export function StarField({ count = 26 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const rnd = seed / 233280;
    const rnd2 = ((i * 4787 + 1237) % 9973) / 9973;
    return {
      left: `${(rnd * 100).toFixed(2)}%`,
      top: `${(rnd2 * 78).toFixed(2)}%`,
      size: 3 + Math.round(rnd2 * 5),
      delay: `${(rnd * 3).toFixed(2)}s`,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="anim-twinkle absolute text-gold-300"
          style={{
            left: s.left,
            top: s.top,
            fontSize: s.size,
            animationDelay: s.delay,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

/** Lentera gantung di sisi atas layar */
export function Lantern({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={`anim-swing pointer-events-none absolute ${className}`} style={style}>
      <svg width="46" height="118" viewBox="0 0 46 118" fill="none">
        <path d="M23 0V34" stroke="#d9a23c" strokeWidth="2" strokeDasharray="4 4" />
        <path
          d="M11 34h24l-3 7H14l-3-7Z"
          fill="#e9bd5f"
          stroke="#8a5a17"
          strokeWidth="2"
        />
        <path
          d="M13 41h20c4 6 6 12 6 19s-2 14-6 20H13c-4-6-6-13-6-20s2-13 6-19Z"
          fill="url(#lg)"
          stroke="#8a5a17"
          strokeWidth="2"
        />
        <path d="M15 45h16M14 52h18M14 59h18M14 66h18M15 73h16" stroke="#8a5a17" strokeWidth="1.2" opacity=".55" />
        <ellipse cx="23" cy="60" rx="5" ry="12" fill="#fff3c9" opacity=".85" />
        <path d="M17 80h12l2 6H15l2-6Z" fill="#e9bd5f" stroke="#8a5a17" strokeWidth="2" />
        <circle cx="23" cy="90" r="3" fill="#f6d68f" />
        <defs>
          <linearGradient id="lg" x1="7" y1="41" x2="39" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e9bd5f" />
            <stop offset=".5" stopColor="#c98d2c" />
            <stop offset="1" stopColor="#8a5a17" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/** Siluet masjid di bagian bawah layar */
export function MosqueSilhouette({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 ${className}`}>
      <svg viewBox="0 0 480 140" className="h-28 w-full md:h-40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#0a4429" />
            <stop offset="1" stopColor="#031b11" />
          </linearGradient>
          <linearGradient id="mg2" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#177444" />
            <stop offset="1" stopColor="#0a4429" />
          </linearGradient>
        </defs>
        <g fill="url(#mg2)" opacity="0.85">
          <path d="M0 140V96h26c6-16 20-24 34-24s28 8 34 24h26v44H0Z" />
          <path d="M300 140V92h30c8-20 24-30 40-30s32 10 40 30h30v48H300Z" />
          <rect x="222" y="112" width="76" height="28" />
        </g>
        <g fill="url(#mg)">
          <path d="M120 140V86c0-30 20-56 45-72 25 16 45 42 45 72v54h-90Z" />
          <rect x="88" y="70" width="14" height="70" />
          <rect x="228" y="70" width="14" height="70" />
          <path d="M95 70c0-10 4-14 8-14s8 4 8 14h-16ZM231 70c0-10 4-14 8-14s8 4 8 14h-16Z" />
          <circle cx="150" cy="8" r="6" />
          <path d="M150 2c6-4 12-2 14 2-4 0-8 2-8 6h-6c0-4-4-6-8-6 2-4 8-6 8-2Z" />
          <rect x="212" y="112" width="14" height="28" />
          <rect x="104" y="112" width="14" height="28" />
          <path d="M254 140v-26c0-8 6-14 14-14s14 6 14 14v26h-28Z" />
        </g>
        <g fill="#e9bd5f" opacity="0.35">
          <path d="M150 52c8 8 12 18 12 26h-24c0-8 4-18 12-26Z" />
          <rect x="146" y="78" width="8" height="16" rx="3" />
          <rect x="296" y="106" width="10" height="22" rx="4" />
          <rect x="354" y="106" width="10" height="22" rx="4" />
        </g>
      </svg>
    </div>
  );
}

/** Kubah emas kecil untuk logo */
export function DomeBadge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <defs>
        <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#fbeec2" />
          <stop offset=".45" stopColor="#e9bd5f" />
          <stop offset="1" stopColor="#b9822a" />
        </linearGradient>
      </defs>
      <path d="M32 4c10 10 16 20 16 28H16c0-8 6-18 16-28Z" fill="url(#dg)" stroke="#6b4512" strokeWidth="2" />
      <circle cx="32" cy="5" r="3.2" fill="#fbeec2" stroke="#6b4512" strokeWidth="1.2" />
      <path d="M14 32h36v26H14V32Z" fill="url(#dg)" stroke="#6b4512" strokeWidth="2" />
      <path d="M27 58V44c0-3 2-5 5-5s5 2 5 5v14" fill="#3b1f0a" opacity=".55" />
      <rect x="8" y="56" width="48" height="6" rx="3" fill="url(#dg)" stroke="#6b4512" strokeWidth="2" />
    </svg>
  );
}

/** Bintang tiga untuk layar hasil */
export function StarRow({ stars }: { stars: number }) {
  return (
    <div className="flex items-end justify-center gap-1">
      {[0, 1, 2].map((i) => {
        const on = i < stars;
        return (
          <div
            key={i}
            className={i === 1 ? "-mt-3" : ""}
            style={{ animationDelay: `${i * 140}ms` }}
          >
            <svg
              viewBox="0 0 24 24"
              className={`anim-star h-12 w-12 md:h-14 md:w-14 ${on ? "drop-shadow-[0_4px_10px_rgba(233,189,95,.55)]" : ""}`}
              style={{ animationDelay: `${i * 140}ms` }}
            >
              <path
                d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95L12 2.6Z"
                fill={on ? "url(#sg)" : "#4a2a10"}
                stroke={on ? "#6b4512" : "#2c1608"}
                strokeWidth="1.4"
              />
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#fff3c9" />
                  <stop offset=".5" stopColor="#f0c164" />
                  <stop offset="1" stopColor="#cf9531" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );
      })}
    </div>
  );
}
