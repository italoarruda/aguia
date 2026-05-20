"use client";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

type TimerMode = "cronometro" | "pomodoro";
const POMODORO_DURATION = 25 * 60;

export function Timer() {
  const [mode, setMode] = useState<TimerMode>("cronometro");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [pomodoroLeft, setPomodoroLeft] = useState(POMODORO_DURATION);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        if (mode === "cronometro") {
          setSeconds((s) => s + 1);
        } else {
          setPomodoroLeft((p) => {
            if (p <= 1) {
              setRunning(false);
              return 0;
            }
            return p - 1;
          });
        }
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, mode]);

  function reset() {
    setRunning(false);
    setSeconds(0);
    setPomodoroLeft(POMODORO_DURATION);
  }

  const displayTime = mode === "cronometro" ? formatTime(seconds) : formatTime(pomodoroLeft);

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex rounded-lg overflow-hidden border border-[var(--border)]">
        {(["cronometro", "pomodoro"] as TimerMode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); reset(); }}
            className={cn(
              "px-3 py-1 text-xs font-medium capitalize transition-colors",
              mode === m
                ? "bg-[var(--surface-2)] text-[var(--text-1)]"
                : "bg-transparent text-[var(--text-3)] hover:text-[var(--text-2)]"
            )}
          >
            {m === "cronometro" ? "Cronômetro" : "Pomodoro"}
          </button>
        ))}
      </div>

      <span className="font-mono font-bold text-base text-[var(--text-1)] min-w-[80px] text-center">
        {displayTime}
      </span>

      {!running ? (
        <button
          onClick={() => setRunning(true)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--primary)] text-[#0A1A2E] text-xs font-semibold hover:bg-[var(--primary-dim)] hover:text-white transition-colors"
        >
          <Play size={12} /> Iniciar
        </button>
      ) : (
        <button
          onClick={() => setRunning(false)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--primary)] text-[#0A1A2E] text-xs font-semibold hover:bg-[var(--primary-dim)] hover:text-white transition-colors"
        >
          <Pause size={12} /> Pausar
        </button>
      )}

      <button
        onClick={reset}
        className="flex items-center gap-1 px-2 py-1 rounded-lg border border-[var(--border)] text-[var(--text-2)] text-xs hover:text-[var(--text-1)] transition-colors"
      >
        <RotateCcw size={12} /> Reiniciar
      </button>
    </div>
  );
}
