import { WoodButton, WoodPanel } from "../components/Ui";
import type { Screen } from "../types";

const STEPS = [
  {
    icon: "📖",
    title: "1. Baca dulu",
    text: "Buka menu BACA SURAH. Baca setiap ayat Surah An-Nas beserta artinya sampai hafal.",
  },
  {
    icon: "❓",
    title: "2. Pilihan Ganda",
    text: "Ada 8 soal dengan 3 pilihan jawaban (A, B, C). Pilih 1 jawaban yang paling benar. Kamu punya 3 nyawa ❤️.",
  },
  {
    icon: "🔗",
    title: "3. Menjodohkan",
    text: "Sentuh satu kartu ayat, lalu sentuh kartu arti yang cocok. Pasangan yang benar akan berwarna hijau.",
  },
  {
    icon: "⭐",
    title: "4. Dapat Bintang",
    text: "Jawaban benar = +10 poin dan +5 koin 🪙. Jawaban benar berturut-turut dapat bonus 🔥 +5.",
  },
];

export default function HelpScreen({ onGo }: { onGo: (s: Screen) => void }) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-md px-4 py-6">
      <h2 className="gold-text text-center text-2xl font-extrabold md:text-3xl">Cara Bermain</h2>
      <p className="mt-1 text-center text-xs font-semibold text-gold-300/90">
        Game Hafalan Surat An-Nas · Kelas 2 SD
      </p>

      <div className="mt-5 space-y-3">
        {STEPS.map((s, i) => (
          <WoodPanel key={s.title} className="anim-pop flex items-start gap-3 px-3 py-3" >
            <div style={{ animationDelay: `${i * 80}ms` }} className="flex gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-wood-700 bg-[linear-gradient(180deg,#fbeec2,#e9bd5f)] text-lg">
                {s.icon}
              </span>
              <div>
                <p className="text-sm font-extrabold text-white text-outline">{s.title}</p>
                <p className="mt-0.5 text-[12px] font-semibold leading-snug text-white/95">{s.text}</p>
              </div>
            </div>
          </WoodPanel>
        ))}
      </div>

      <WoodPanel dark className="mt-4 px-4 py-3">
        <p className="text-center text-[11px] font-semibold leading-relaxed text-white/95">
          🤲 <b>Doa sebelum belajar:</b> Rabbi zidnī 'ilmā — "Ya Tuhanku, tambahkanlah ilmu kepadaku."
        </p>
      </WoodPanel>

      <div className="mt-5 space-y-3">
        <WoodButton gold size="lg" onClick={() => onGo("quiz")}>
          ▶ MULAI SEKARANG
        </WoodButton>
        <button
          onClick={() => onGo("home")}
          className="mx-auto block text-xs font-bold text-gold-300/80 underline"
        >
          ← Kembali ke Menu
        </button>
      </div>
    </div>
  );
}
