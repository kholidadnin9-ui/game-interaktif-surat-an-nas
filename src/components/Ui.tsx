import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import { sfx } from "../lib/sound";

export function WoodPanel({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn(dark ? "wood-panel-dark" : "wood-panel", "rounded-[22px]", className)}>
      {children}
    </div>
  );
}

export function WoodButton({
  children,
  onClick,
  className,
  gold = false,
  disabled,
  state,
  size = "md",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  gold?: boolean;
  disabled?: boolean;
  state?: "correct" | "wrong" | "idle";
  size?: "sm" | "md" | "lg";
}) {
  const stateCls =
    state === "correct" ? "state-correct" : state === "wrong" ? "state-wrong" : "";
  return (
    <button
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        sfx.tap();
        onClick?.();
      }}
      className={cn(
        "relative w-full select-none rounded-[16px] font-bold text-white text-outline",
        gold ? "gold-btn" : "wood-btn",
        size === "sm" && "px-3 py-2 text-sm",
        size === "md" && "px-4 py-3 text-base",
        size === "lg" && "px-6 py-4 text-xl tracking-wide",
        stateCls,
        disabled && "opacity-60",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function StatPill({
  icon,
  value,
  className,
}: {
  icon: ReactNode;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("pill flex items-center gap-1.5 rounded-full px-2.5 py-1", className)}>
      <span className="text-sm leading-none">{icon}</span>
      <span className="text-sm font-extrabold text-gold-200 tabular-nums">{value}</span>
    </div>
  );
}

export function Hearts({ lives, max = 3 }: { lives: number; max?: number }) {
  return (
    <div className="pill flex items-center gap-1 rounded-full px-2.5 py-1">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={cn("text-sm leading-none", i < lives ? "" : "opacity-25 grayscale")}>
          ❤️
        </span>
      ))}
    </div>
  );
}

export function CoinPill({ coins }: { coins: number }) {
  return (
    <div className="pill flex items-center gap-1.5 rounded-full px-2.5 py-1">
      <span className="grid h-4 w-4 place-items-center rounded-full bg-gradient-to-b from-gold-200 to-gold-500 text-[9px] font-black text-wood-700 shadow-inner">
        $
      </span>
      <span className="text-sm font-extrabold text-gold-200 tabular-nums">{coins}</span>
    </div>
  );
}

export function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, total)) * 100));
  return (
    <div className="relative h-4 w-full overflow-hidden rounded-full border-2 border-deep-900 bg-deep-900/70 shadow-inner">
      <div
        className="h-full rounded-full bg-[linear-gradient(180deg,#fbeec2,#e9bd5f_45%,#c98d2c)] transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
      <div className="absolute inset-0 grid place-items-center text-[10px] font-extrabold text-white/90 text-outline">
        {value}/{total}
      </div>
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="gold-text text-center text-2xl font-extrabold md:text-3xl">{children}</h2>;
}

export function GameTopBar({
  onBack,
  progress,
  total,
  coins,
  lives,
  maxLives = 3,
  right,
}: {
  onBack: () => void;
  progress: number;
  total: number;
  coins: number;
  lives: number;
  maxLives?: number;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          sfx.tap();
          onBack();
        }}
        className="wood-btn grid h-9 w-9 shrink-0 place-items-center rounded-full text-base font-black text-white"
        aria-label="Kembali"
      >
        ←
      </button>
      <div className="min-w-0 flex-1">
        <ProgressBar value={progress} total={total} />
      </div>
      <CoinPill coins={coins} />
      {right ?? <Hearts lives={lives} max={maxLives} />}
    </div>
  );
}

export function FloatingScore({ items }: { items: { id: number; text: string }[] }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/3 z-30 flex flex-col items-center">
      {items.map((i) => (
        <span
          key={i.id}
          className="anim-rise gold-text text-3xl font-extrabold md:text-4xl"
        >
          {i.text}
        </span>
      ))}
    </div>
  );
}
