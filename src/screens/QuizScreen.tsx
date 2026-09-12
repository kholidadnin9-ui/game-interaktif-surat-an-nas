import { useEffect, useMemo, useRef, useState } from "react";
import { Lantern, StarField } from "../components/Decor";
import { FloatingScore, GameTopBar, WoodButton, WoodPanel } from "../components/Ui";
import { MC_QUESTIONS, shuffle } from "../data/surah";
import { sfx } from "../lib/sound";
import type { ResultPayload } from "../types";

const TOTAL_QUESTIONS = 8;
const POINTS = 10;

type Prepared = {
  qid: number;
  options: string[];
  answer: number;
};

export default function QuizScreen({
  onFinish,
  onQuit,
}: {
  onFinish: (r: ResultPayload) => void;
  onQuit: () => void;
}) {
  const questions = useMemo(() => shuffle(MC_QUESTIONS).slice(0, TOTAL_QUESTIONS), []);
  const prepared = useMemo<Prepared[]>(
    () =>
      questions.map((q) => {
        const idx = shuffle(q.options.map((_, i) => i));
        return {
          qid: q.id,
          options: idx.map((i) => q.options[i]),
          answer: idx.indexOf(q.answer),
        };
      }),
    [questions],
  );

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [lives, setLives] = useState(3);
  const [coins, setCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [floats, setFloats] = useState<{ id: number; text: string }[]>([]);
  const [shakeKey, setShakeKey] = useState(0);
  const finished = useRef(false);

  const q = questions[index];
  const p = prepared[index];
  const isAnswered = picked !== null;

  useEffect(() => {
    if (lives <= 0 && !finished.current) {
      finished.current = true;
      sfx.lose();
      const t = setTimeout(
        () => onFinish({ mode: "quiz", score, correct: correctCount, total: TOTAL_QUESTIONS, livesLeft: 0 }),
        900,
      );
      return () => clearTimeout(t);
    }
  }, [lives, score, correctCount, onFinish]);

  const pushFloat = (text: string) => {
    const id = Date.now() + Math.random();
    setFloats((f) => [...f, { id, text }]);
    setTimeout(() => setFloats((f) => f.filter((x) => x.id !== id)), 950);
  };

  const choose = (i: number) => {
    if (isAnswered) return;
    setPicked(i);
    if (i === p.answer) {
      const bonus = streak >= 2 ? 5 : 0;
      const gained = POINTS + bonus;
      setScore((s) => s + gained);
      setCoins((c) => c + 5);
      setCorrectCount((c) => c + 1);
      setStreak((s) => s + 1);
      pushFloat(bonus ? `+${gained} 🔥` : `+${gained}`);
      sfx.correct();
    } else {
      setStreak(0);
      setLives((l) => Math.max(0, l - 1));
      setShakeKey((k) => k + 1);
      sfx.wrong();
    }
  };

  const next = () => {
    if (finished.current) return;
    if (index + 1 >= TOTAL_QUESTIONS) {
      finished.current = true;
      if (correctCount >= 1) sfx.win();
      onFinish({
        mode: "quiz",
        score,
        correct: correctCount,
        total: TOTAL_QUESTIONS,
        livesLeft: lives,
      });
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  };

  return (
    <div className="relative flex min-h-full flex-col px-3 pb-8 pt-4">
      <Lantern className="left-0 -top-3 hidden sm:block" />
      <Lantern className="right-0 -top-3 hidden sm:block" style={{ animationDelay: ".9s" }} />
      <StarField count={16} />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col">
        <GameTopBar
          onBack={onQuit}
          progress={index + (isAnswered ? 1 : 0)}
          total={TOTAL_QUESTIONS}
          coins={coins}
          lives={lives}
        />

        <div className="mt-3 flex items-center justify-between text-[11px] font-extrabold text-gold-300/90">
          <span>SOAL {index + 1} DARI {TOTAL_QUESTIONS}</span>
          <span className="flex items-center gap-2">
            <span>SKOR {score}</span>
            {streak >= 2 && <span className="anim-glow rounded-full bg-wood-700/60 px-2 py-0.5">🔥 {streak}x</span>}
          </span>
        </div>

        <div className="relative mt-2 flex-1">
          <FloatingScore items={floats} />

          {/* Panel soal */}
          <div key={`${index}-${shakeKey}`} className={shakeKey && picked !== null && picked !== p.answer ? "anim-shake" : ""}>
            <WoodPanel className="px-4 py-5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border-2 border-wood-700 bg-[linear-gradient(180deg,#fbeec2,#e9bd5f)] px-3 py-0.5 text-[10px] font-black text-wood-700">
                PERTANYAAN
              </div>
              <p className="mt-1 text-center text-[15px] font-bold leading-snug text-white md:text-base">
                {q.question}
              </p>
              {q.arab && (
                <p className="arabic mt-3 rounded-xl bg-wood-700/25 px-3 py-2 text-center text-[30px] leading-[1.9] text-gold-200 md:text-[34px]">
                  {q.arab}
                </p>
              )}
            </WoodPanel>
          </div>

          {/* Opsi jawaban */}
          <div className="mt-4 space-y-3">
            {p.options.map((opt, i) => {
              const label = ["A", "B", "C"][i];
              let state: "correct" | "wrong" | "idle" = "idle";
              if (isAnswered) {
                if (i === p.answer) state = "correct";
                else if (i === picked) state = "wrong";
                else state = "idle";
              }
              return (
                <div key={`${index}-${i}`} className="anim-pop" style={{ animationDelay: `${i * 70}ms` }}>
                  <WoodButton
                    state={state}
                    disabled={isAnswered}
                    onClick={() => choose(i)}
                    className="flex items-center gap-3 text-left"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-wood-700 bg-wood-700/40 text-xs font-black">
                      {label}
                    </span>
                    <span className="text-[14px] leading-snug md:text-[15px]">{opt}</span>
                  </WoodButton>
                </div>
              );
            })}
          </div>

          {/* Umpan balik */}
          {isAnswered && (
            <div className="anim-pop mt-4">
              <WoodPanel dark className="px-4 py-3">
                <p className="text-center text-base font-extrabold text-gold-200">
                  {picked === p.answer ? "🎉 Benar sekali!" : "😔 Belum tepat"}
                </p>
                <p className="mt-1 text-center text-[12px] font-semibold leading-relaxed text-white/95">
                  {picked !== p.answer && (
                    <>
                      Jawaban benar: <b>{p.options[p.answer]}</b>.{" "}
                    </>
                  )}
                  {q.fact}
                </p>
              </WoodPanel>
              <div className="mt-3 max-w-[240px]">
                <WoodButton gold size="md" onClick={next}>
                  {index + 1 >= TOTAL_QUESTIONS ? "🏁 LIHAT HASIL" : "LANJUT ➜"}
                </WoodButton>
              </div>
            </div>
          )}

          {isAnswered && lives === 0 && (
            <p className="mt-3 text-center text-[11px] font-bold text-gold-300/80">
              Nyawa habis... semangat! Ayo coba lagi 💪
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
