import { useState } from "react";
import { Lantern, StarField } from "../components/Decor";
import { WoodButton, WoodPanel } from "../components/Ui";
import { SURAH_META, VERSES } from "../data/surah";
import { sfx } from "../lib/sound";
import type { Screen } from "../types";

export default function LearnScreen({ onGo }: { onGo: (s: Screen) => void }) {
  const [showMeaning, setShowMeaning] = useState(true);
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative flex min-h-full flex-col px-3 pb-8 pt-4">
      <Lantern className="right-0 -top-2 hidden sm:block" />
      <StarField count={18} />

      <div className="relative z-10 mx-auto w-full max-w-md">
        <h2 className="gold-text text-center text-2xl font-extrabold md:text-3xl">Ayo Baca &amp; Hafal</h2>
        <p className="mt-1 text-center text-xs font-semibold text-gold-300/90">
          {SURAH_META.nama} · {SURAH_META.golongan}
        </p>

        <div className="mt-3 flex justify-center">
          <button
            onClick={() => {
              sfx.tap();
              setShowMeaning((v) => !v);
            }}
            className="rounded-full border-2 border-gold-500/60 bg-deep-900/60 px-4 py-1.5 text-[11px] font-extrabold text-gold-200"
          >
            {showMeaning ? "🙈 SEMBUNYIKAN ARTI (UJI HAFALAN)" : "👁️ TAMPILKAN ARTI"}
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {VERSES.map((v) => (
            <WoodPanel key={v.no} className="anim-pop px-3 py-3">
              <button
                onClick={() => {
                  sfx.tap();
                  setActive(active === v.no ? null : v.no);
                }}
                className="w-full text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-wood-700 bg-[linear-gradient(180deg,#fbeec2,#e9bd5f)] text-sm font-black text-wood-700">
                    {v.no}
                  </span>
                  <div className="flex-1">
                    <p className="arabic text-right text-[26px] leading-[1.9] text-cream drop-shadow-[0_1px_0_rgba(0,0,0,.35)] md:text-[30px]">
                      {v.arab}
                    </p>
                    {showMeaning && (
                      <div className="mt-1 space-y-0.5 rounded-lg bg-wood-700/25 px-2 py-1.5">
                        <p className="text-[11px] font-bold italic text-gold-200/90">{v.latin}</p>
                        <p className="text-[13px] font-semibold leading-snug text-white">
                          "{v.arti}"
                        </p>
                      </div>
                    )}
                    {active === v.no && showMeaning && (
                      <p className="anim-pop mt-1 text-[11px] font-bold text-gold-200/80">
                        ✿ Baca 3 kali sampai lancar, ya!
                      </p>
                    )}
                  </div>
                </div>
              </button>
            </WoodPanel>
          ))}
        </div>

        <WoodPanel dark className="mt-4 px-4 py-3">
          <p className="text-center text-xs font-extrabold tracking-wide text-gold-200">
            💡 INGAT INI!
          </p>
          <p className="mt-1 text-center text-[12px] font-semibold leading-relaxed text-white/95">
            {SURAH_META.kandungan}
          </p>
          <p className="mt-2 text-center text-[11px] font-semibold text-gold-300/90">
            Surah An-Nas dan Al-Falaq disebut <b>Al-Mu'awwidzatain</b> (dua surah perlindungan).
          </p>
        </WoodPanel>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <WoodButton gold onClick={() => onGo("quiz")}>
            ▶ KUIS
          </WoodButton>
          <WoodButton onClick={() => onGo("match")}>🔗 MENJODOHKAN</WoodButton>
        </div>
        <button
          onClick={() => {
            sfx.tap();
            onGo("home");
          }}
          className="mx-auto mt-4 block text-xs font-bold text-gold-300/80 underline"
        >
          ← Kembali ke Menu
        </button>
      </div>
    </div>
  );
}
