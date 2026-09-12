import { useEffect, useMemo, useRef, useState } from "react";
import { Lantern, StarField } from "../components/Decor";
import { GameTopBar, StatPill, WoodButton, WoodPanel } from "../components/Ui";
import { MATCH_VERSE_PAIRS, MATCH_WORD_PAIRS, shuffle } from "../data/surah";
import { sfx } from "../lib/sound";
import type { ResultPayload } from "../types";

type Pair = { id: string; arab: string; arti: string };
type Level = "ayat" | "kata";

const POINTS_PER_PAIR = 15;

export default function MatchScreen({
  onFinish,
  onQuit,
}: {
  onFinish: (r: ResultPayload) => void;
  onQuit: () => void;
}) {
  const [level, setLevel] = useState<Level | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [selArab, setSelArab] = useState<string | null>(null);
  const [selArti, setSelArti] = useState<string | null>(null);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [coins, setCoins] = useState(0);
  const finished = useRef(false);

  const pairs: Pair[] = useMemo(() => {
    if (level === "kata") return MATCH_WORD_PAIRS as Pair[];
    if (level === "ayat") return MATCH_VERSE_PAIRS as Pair[];
    return [];
  }, [level]);

  const leftCol = useMemo(() => shuffle(pairs), [pairs]);
  const rightCol = useMemo(() => shuffle(pairs), [pairs]);

  useEffect(() => {
    setMatched([]);
    setSelArab(null);
    setSelArti(null);
    setMistakes(0);
  }, [level]);

  const total = pairs.length;
  const score = matched.length * POINTS_PER_PAIR;

  useEffect(() => {
    if (level && matched.length === total && total > 0 && !finished.current) {
      finished.current = true;
      sfx.win();
      const t = setTimeout(
        () =>
          onFinish({
            mode: "match",
            score,
            correct: matched.length,
            total,
            livesLeft: total - mistakes,
          }),
        850,
      );
      return () => clearTimeout(t);
    }
  }, [matched.length, total, level, score, mistakes, onFinish]);

  const tryMatch = (a: string | null, m: string | null) => {
    if (!a || !m) return;
    if (a === m) {
      sfx.match();
      setMatched((prev) => [...prev, a]);
      setSelArab(null);
      setSelArti(null);
      setCoins((c) => c + 3);
    } else {
      sfx.wrong();
      setMistakes((x) => x + 1);
      setWrongFlash(true);
      setTimeout(() => {
        setWrongFlash(false);
        setSelArab(null);
        setSelArti(null);
      }, 520);
    }
  };

  const pickArab = (id: string) => {
    if (matched.includes(id)) return;
    sfx.tap();
    if (selArab === id) {
      setSelArab(null);
      return;
    }
    setSelArab(id);
    if (selArti) tryMatch(id, selArti);
  };

  const pickArti = (id: string) => {
    if (matched.includes(id)) return;
    sfx.tap();
    if (selArti === id) {
      setSelArti(null);
      return;
    }
    setSelArti(id);
    if (selArab) tryMatch(selArab, id);
  };

  const startLevel = (l: Level) => {
    sfx.tap();
    finished.current = false;
    setLevel(l);
  };

  /* ---------- Pilih level ---------- */
  if (!level) {
    return (
      <div className="relative flex min-h-full flex-col items-center px-4 pb-10 pt-6">
        <StarField count={18} />
        <Lantern className="left-0 top-0 hidden sm:block" />
        <div className="relative z-10 w-full max-w-md">
          <h2 className="gold-text text-center text-2xl font-extrabold md:text-3xl">Menjodohkan</h2>
          <p className="mt-1 text-center text-xs font-semibold text-gold-300/90">
            Pasangkan ayat / kata dengan artinya
          </p>

          <div className="mt-5 space-y-4">
            <WoodPanel className="px-4 py-4">
              <p className="text-center text-base font-extrabold text-gold-200">Ayat ↔ Arti</p>
              <p className="mt-1 text-center text-[12px] font-semibold text-white/90">
                Jodohkan 6 ayat Surah An-Nas dengan artinya.
              </p>
              <div className="mt-3 max-w-[220px]">
                <WoodButton gold size="md" onClick={() => startLevel("ayat")}>
                  AYO MAIN
                </WoodButton>
              </div>
            </WoodPanel>

            <WoodPanel dark className="px-4 py-4">
              <p className="text-center text-base font-extrabold text-gold-200">Kata ↔ Arti</p>
              <p className="mt-1 text-center text-[12px] font-semibold text-white/90">
                Level mudah: jodohkan 5 kata penting (An-Nas, Malik, Ilah...).
              </p>
              <div className="mt-3 max-w-[220px]">
                <WoodButton size="md" onClick={() => startLevel("kata")}>
                  AYO MAIN
                </WoodButton>
              </div>
            </WoodPanel>

            <button
              onClick={() => {
                sfx.tap();
                onQuit();
              }}
              className="mx-auto block text-xs font-bold text-gold-300/80 underline"
            >
              ← Kembali ke Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Papan permainan ---------- */
  const done = matched.length === total;

  return (
    <div className="relative flex min-h-full flex-col px-3 pb-8 pt-4">
      <StarField count={14} />
      <Lantern className="right-0 -top-3 hidden sm:block" />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col">
        <GameTopBar
          onBack={() => {
            setLevel(null);
            finished.current = false;
          }}
          progress={matched.length}
          total={total}
          coins={coins}
          lives={0}
          right={<StatPill icon="❌" value={mistakes} />}
        />

        <div className="mt-3 text-center">
          <p className="gold-text text-lg font-extrabold md:text-xl">
            {level === "ayat" ? "Jodohkan Ayat dengan Artinya" : "Jodohkan Kata dengan Artinya"}
          </p>
          <p className="text-[11px] font-semibold text-gold-300/90">
            Sentuh 1 kartu ayat, lalu sentuh kartu arti yang cocok
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {/* Kolom ayat */}
          <div className="space-y-2">
            <p className="text-center text-[10px] font-black tracking-widest text-gold-300/80">
              {level === "ayat" ? "AYAT" : "KATA"}
            </p>
            {leftCol.map((p) => {
              const isMatched = matched.includes(p.id);
              const selected = selArab === p.id;
              const wrongSel = wrongFlash && selected;
              return (
                <button
                  key={p.id}
                  onClick={() => pickArab(p.id)}
                  disabled={isMatched}
                  className={[
                    "w-full rounded-xl border-2 px-2 py-2 text-center transition-all duration-150 active:scale-95",
                    isMatched
                      ? "border-[#12512f] bg-[linear-gradient(180deg,#8fe0a8,#2b8a55)] opacity-70"
                      : wrongSel
                        ? "anim-shake border-[#7d2419] bg-[linear-gradient(180deg,#f3a08f,#c1503d)]"
                        : selected
                          ? "anim-glow scale-[1.03] border-gold-300 bg-[linear-gradient(180deg,#f0c164,#c98d2c)]"
                          : "wood-btn",
                  ].join(" ")}
                >
                  <p
                    className={[
                      "arabic text-[19px] leading-[1.75] md:text-[21px]",
                      isMatched ? "text-white" : "text-white",
                    ].join(" ")}
                  >
                    {p.arab}
                  </p>
                  {isMatched && <p className="text-[9px] font-black text-white/90">✓ TERJODOHKAN</p>}
                </button>
              );
            })}
          </div>

          {/* Kolom arti */}
          <div className="space-y-2">
            <p className="text-center text-[10px] font-black tracking-widest text-gold-300/80">ARTI</p>
            {rightCol.map((p) => {
              const isMatched = matched.includes(p.id);
              const selected = selArti === p.id;
              const wrongSel = wrongFlash && selected;
              return (
                <button
                  key={p.id}
                  onClick={() => pickArti(p.id)}
                  disabled={isMatched}
                  className={[
                    "flex w-full items-center rounded-xl border-2 px-2 py-2 text-left transition-all duration-150 active:scale-95",
                    isMatched
                      ? "border-[#12512f] bg-[linear-gradient(180deg,#8fe0a8,#2b8a55)] opacity-70"
                      : wrongSel
                        ? "anim-shake border-[#7d2419] bg-[linear-gradient(180deg,#f3a08f,#c1503d)]"
                        : selected
                          ? "anim-glow scale-[1.03] border-gold-300 bg-[linear-gradient(180deg,#f0c164,#c98d2c)]"
                          : "wood-btn",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "text-[11px] font-semibold leading-snug md:text-[12px]",
                      "text-outline",
                    ].join(" ")}
                  >
                    {p.arti}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3 text-[11px] font-extrabold text-gold-300/90">
          <span>SKOR {score}</span>
          <span>·</span>
          <span>SALAH {mistakes}x</span>
        </div>

        {done && (
          <div className="anim-pop mt-3">
            <WoodPanel dark className="px-4 py-3">
              <p className="text-center text-base font-extrabold text-gold-200">
                🎊 Masya Allah! Semua pasangan benar!
              </p>
              <p className="mt-1 text-center text-[12px] font-semibold text-white/95">
                Kamu menjodohkan {total} pasangan dengan {mistakes} kali salah.
              </p>
            </WoodPanel>
          </div>
        )}
      </div>
    </div>
  );
}
