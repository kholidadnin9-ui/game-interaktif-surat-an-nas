import { DomeBadge, StarRow } from "../components/Decor";
import { WoodButton, WoodPanel } from "../components/Ui";
import type { ResultPayload, Screen } from "../types";

export function starsFor(r: ResultPayload) {
  const pct = r.correct / Math.max(1, r.total);
  if (r.mode === "quiz") {
    if (pct >= 0.85) return 3;
    if (pct >= 0.6) return 2;
    if (pct >= 0.3) return 1;
    return 0;
  }
  const mistakes = r.total - r.livesLeft;
  if (mistakes <= 1) return 3;
  if (mistakes <= 3) return 2;
  return 1;
}

const PRAISE = [
  { min: 3, title: "Masya Allah, Hebat!", sub: "Kamu hafal Surat An-Nas dengan sangat baik! 🌟" },
  { min: 2, title: "Bagus Sekali!", sub: "Sedikit lagi latihan kamu pasti sempurna! 💪" },
  { min: 1, title: "Ayoo Semangat!", sub: "Baca dulu surahnya, lalu coba lagi ya! 📖" },
  { min: 0, title: "Jangan Menyerah!", sub: "Ayo pelajari lagi bersama guru atau orang tua. 🤲" },
];

export default function ResultScreen({
  result,
  onGo,
  onReplay,
  isBest,
}: {
  result: ResultPayload;
  onGo: (s: Screen) => void;
  onReplay: () => void;
  isBest: boolean;
}) {
  const stars = starsFor(result);
  const praise = PRAISE.find((p) => p.min <= stars) ?? PRAISE[3];

  return (
    <div className="relative flex min-h-full items-center justify-center px-4 py-8">
      <div className="anim-pop relative z-10 w-full max-w-sm">
        <div className="flex justify-center">
          <DomeBadge className="anim-float h-14 w-14" />
        </div>

        <div className="relative mt-3">
          <div className="rounded-[26px] bg-gradient-to-b from-gold-300 via-gold-500 to-wood-700 p-[4px] shadow-[0_18px_40px_rgba(0,0,0,.6)]">
            <div className="rounded-[22px] bg-[linear-gradient(180deg,#c9884a_0%,#a2652f_55%,#7c471f_100%)] px-5 pb-6 pt-5">
              <StarRow stars={stars} />
              <p className="mt-3 text-center text-2xl font-extrabold text-white text-outline">
                {praise.title}
              </p>
              <p className="mt-1 text-center text-[12px] font-semibold leading-snug text-white/95">
                {praise.sub}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl border-2 border-wood-700 bg-wood-700/40 px-2 py-2">
                  <p className="text-[10px] font-bold text-gold-200">SKOR</p>
                  <p className="gold-text text-xl font-extrabold">{result.score}</p>
                </div>
                <div className="rounded-xl border-2 border-wood-700 bg-wood-700/40 px-2 py-2">
                  <p className="text-[10px] font-bold text-gold-200">
                    {result.mode === "quiz" ? "BENAR" : "PASANGAN"}
                  </p>
                  <p className="gold-text text-xl font-extrabold">
                    {result.correct}/{result.total}
                  </p>
                </div>
              </div>

              {result.mode === "match" && (
                <p className="mt-2 text-center text-[11px] font-bold text-gold-200/90">
                  Salah {result.total - result.livesLeft} kali
                </p>
              )}
              {isBest && (
                <p className="anim-glow mt-3 rounded-full border-2 border-gold-300 bg-deep-900/50 py-1 text-center text-[11px] font-black text-gold-200">
                  🏆 REKOR BARU!
                </p>
              )}

              <div className="mt-5 space-y-3">
                <WoodButton gold size="lg" onClick={onReplay}>
                  🔄 MAIN LAGI
                </WoodButton>
                <div className="grid grid-cols-2 gap-3">
                  <WoodButton size="sm" onClick={() => onGo("learn")}>
                    📖 BACA SURAH
                  </WoodButton>
                  <WoodButton size="sm" onClick={() => onGo("home")}>
                    🏠 MENU
                  </WoodButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <WoodPanel dark className="mt-4 px-4 py-3">
          <p className="text-center text-[11px] font-semibold leading-relaxed text-white/95">
            💡 <b>Tips hafalan:</b> baca setiap ayat 3 kali sambil melihat artinya, lalu hafalkan
            per ayat sampai lancar sebelum lanjut ke ayat berikutnya.
          </p>
        </WoodPanel>
      </div>
    </div>
  );
}
