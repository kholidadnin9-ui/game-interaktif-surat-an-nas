export type Screen = "home" | "learn" | "quiz" | "match" | "result" | "help";

export type Stats = {
  best: number;
  coins: number;
};

export type GameMode = "quiz" | "match";

export type ResultPayload = {
  mode: GameMode;
  score: number;
  correct: number;
  total: number;
  livesLeft: number;
};
