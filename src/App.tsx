import { useCallback, useEffect, useState } from "react";
import { StarField } from "./components/Decor";
import HomeScreen from "./screens/HomeScreen";
import LearnScreen from "./screens/LearnScreen";
import QuizScreen from "./screens/QuizScreen";
import MatchScreen from "./screens/MatchScreen";
import ResultScreen from "./screens/ResultScreen";
import HelpScreen from "./screens/HelpScreen";
import type { ResultPayload, Screen, Stats } from "./types";

const STORE_KEY = "pai-an-nas-stats";

const loadStats = (): Stats => {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Stats;
      return { best: parsed.best ?? 0, coins: parsed.coins ?? 0 };
    }
  } catch {
    /* ignore */
  }
  return { best: 0, coins: 0 };
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [stats, setStats] = useState<Stats>(loadStats);
  const [result, setResult] = useState<ResultPayload | null>(null);
  const [isBest, setIsBest] = useState(false);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(stats));
    } catch {
      /* ignore */
    }
  }, [stats]);

  const handleFinish = useCallback((r: ResultPayload) => {
    setResult(r);
    setStats((prev) => {
      const best = Math.max(prev.best, r.score);
      setIsBest(r.score > prev.best && r.score > 0);
      return { best, coins: prev.coins + Math.round(r.score / 3) };
    });
    setScreen("result");
  }, []);

  const replay = () => {
    setRunKey((k) => k + 1);
    setScreen(result?.mode === "match" ? "match" : "quiz");
  };

  const go = (s: Screen) => {
    if (s === "quiz" || s === "match") setRunKey((k) => k + 1);
    setScreen(s);
  };

  const quitToHome = () => setScreen("home");

  return (
    <div className="pattern-bg relative flex min-h-screen w-full items-start justify-center overflow-x-hidden">
      {/* Bingkai ala ponsel */}
      <div className="relative z-10 min-h-screen w-full max-w-[520px] overflow-hidden bg-[linear-gradient(180deg,#0a4429_0%,#06301f_45%,#031b11_100%)] shadow-[0_0_60px_rgba(0,0,0,.7)] sm:my-4 sm:min-h-[calc(100vh-2rem)] sm:rounded-[28px] sm:border-4 sm:border-gold-500/70">
        <div className="vignette pointer-events-none absolute inset-0 z-0" />
        <div className="relative flex min-h-full flex-col">
          {screen === "home" && <HomeScreen onGo={go} stats={stats} />}
          {screen === "learn" && <LearnScreen onGo={go} />}
          {screen === "help" && <HelpScreen onGo={go} />}
          {screen === "quiz" && (
            <QuizScreen key={`q-${runKey}`} onFinish={handleFinish} onQuit={quitToHome} />
          )}
          {screen === "match" && (
            <MatchScreen key={`m-${runKey}`} onFinish={handleFinish} onQuit={quitToHome} />
          )}
          {screen === "result" && result && (
            <ResultScreen result={result} onGo={go} onReplay={replay} isBest={isBest} />
          )}
        </div>
        <StarField count={10} />
      </div>
    </div>
  );
}
