let ctx: AudioContext | null = null;

const getCtx = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
};

type ToneOpts = {
  freq: number;
  dur?: number;
  type?: OscillatorType;
  delay?: number;
  gain?: number;
  sweepTo?: number;
};

const tone = ({ freq, dur = 0.16, type = "triangle", delay = 0, gain = 0.16, sweepTo }: ToneOpts) => {
  const c = getCtx();
  if (!c) return;
  const start = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (sweepTo) osc.frequency.exponentialRampToValueAtTime(Math.max(40, sweepTo), start + dur);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g).connect(c.destination);
  osc.start(start);
  osc.stop(start + dur + 0.05);
};

export const sfx = {
  tap: () => tone({ freq: 520, dur: 0.08, type: "square", gain: 0.07 }),
  correct: () => {
    tone({ freq: 660, dur: 0.12, gain: 0.14 });
    tone({ freq: 880, dur: 0.14, delay: 0.1, gain: 0.14 });
    tone({ freq: 1180, dur: 0.22, delay: 0.2, gain: 0.12 });
  },
  wrong: () => {
    tone({ freq: 300, dur: 0.28, type: "sawtooth", gain: 0.1, sweepTo: 120 });
  },
  match: () => {
    tone({ freq: 780, dur: 0.1, gain: 0.12 });
    tone({ freq: 1040, dur: 0.16, delay: 0.08, gain: 0.12 });
  },
  win: () => {
    [523, 659, 784, 1046].forEach((f, i) =>
      tone({ freq: f, dur: 0.28, delay: i * 0.14, gain: 0.13 }),
    );
  },
  lose: () => {
    [523, 440, 349, 262].forEach((f, i) =>
      tone({ freq: f, dur: 0.3, delay: i * 0.16, type: "sine", gain: 0.13 }),
    );
  },
};
