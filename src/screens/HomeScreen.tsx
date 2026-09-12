import { DomeBadge, Lantern, MosqueSilhouette, StarField } from "../components/Decor";
import { WoodButton } from "../components/Ui";
import { SURAH_META, VERSES } from "../data/surah";
import type { Screen, Stats } from "../types";

export default function HomeScreen({
  onGo,
  stats,
}: {
  onGo: (s: Screen) => void;
  stats: Stats;
}) {
  return (
    <div className="relative flex min-h-full flex-col items-center px-4 pb-10 pt-6">
      <Lantern className="left-2 top-0 hidden sm:block" />
      <Lantern className="right-2 top-0 hidden sm:block" style={{ animationDelay: "0.7s" }} />
      <StarField />

      <div className="anim-pop relative z-10 flex w-full max-w-md flex-1 flex-col items-center">
        <div className="flex flex-col items-center">
          <DomeBadge className="anim-float h-12 w-12" />
          <h1 className="gold-text mt-1 text-center text-[30px] leading-tight font-extrabold md:text-4xl">
            Hafalan Surat An-Nas
          </h1>
          <p className="mt-0.5 text-center text-xs font-semibold tracking-wide text-gold-300/90 md:text-sm">
            Pendidikan Agama Islam · Kelas 2 SD
          </p>
        </div>

        {/* Lengkungan masjid */}
        <div className="relative mt-5 w-full max-w-[320px]">
          <div className="rounded-t-[150px] rounded-b-[26px] bg-gradient-to-b from-gold-300 via-gold-500 to-wood-700 p-[3px] shadow-[0_18px_40px_rgba(0,0,0,.55)]">
            <div className="flex flex-col items-center gap-3 rounded-t-[147px] rounded-b-[23px] bg-[linear-gradient(180deg,#0f5c34_0%,#083c24_55%,#041f13_100%)] px-5 pb-6 pt-10">
              <p className="arabic text-center text-2xl text-gold-200">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
              <p className="arabic text-center text-3xl leading-loose text-gold-300">
                {SURAH_META.arabName}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full bg-deep-900/70 px-3 py-1 text-[11px] font-bold text-leaf-300">
                  Surah ke-{SURAH_META.nomor}
                </span>
                <span className="rounded-full bg-deep-900/70 px-3 py-1 text-[11px] font-bold text-leaf-300">
                  {SURAH_META.jumlahAyat} Ayat
                </span>
                <span className="rounded-full bg-deep-900/70 px-3 py-1 text-[11px] font-bold text-leaf-300">
                  {SURAH_META.artiNama}
                </span>
              </div>
              <div className="mt-1 w-full space-y-1 rounded-xl border border-gold-500/25 bg-deep-900/45 px-3 py-2">
                <p className="text-center text-[11px] font-semibold text-gold-300/80">
                  Total ayat: {VERSES.length} · Cocok untuk hafalan harian
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full max-w-[300px] space-y-3">
          <WoodButton gold size="lg" onClick={() => onGo("quiz")}>
            ▶ MAIN KUIS
          </WoodButton>
          <WoodButton onClick={() => onGo("match")}>🔗 MENJODOHKAN AYAT</WoodButton>
          <div className="grid grid-cols-2 gap-3">
            <WoodButton size="sm" onClick={() => onGo("learn")}>
              📖 BACA SURAH
            </WoodButton>
            <WoodButton size="sm" onClick={() => onGo("help")}>
              ❓ CARA MAIN
            </WoodButton>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 text-xs font-bold text-gold-300/90">
          <span>⭐ Skor terbaik: {stats.best}</span>
          <span>·</span>
          <span>🪙 Koin: {stats.coins}</span>
        </div>
      </div>

      <MosqueSilhouette />
    </div>
  );
}
