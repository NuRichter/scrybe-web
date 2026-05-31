"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { terminalLines } from "@/lib/content";

const tone: Record<string, string> = {
  muted: "text-muted",
  ink: "text-ink",
  gold: "text-gold",
  ok: "text-ok"
};

export default function Terminal() {
  const [count, setCount] = useState(0);
  const [run, setRun] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setCount(0);
    timer.current = setInterval(() => {
      setCount((c) => {
        if (c >= terminalLines.length) {
          if (timer.current) clearInterval(timer.current);
          return c;
        }
        return c + 1;
      });
    }, 320);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [run]);

  const done = count >= terminalLines.length;

  return (
    <section className="relative px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="bracket border border-line bg-[#060608]/90 shadow-gold">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
            <span className="ml-3 font-mono text-[10px] tracking-[0.2em] text-muted">
              session // headless
            </span>
            <button
              onClick={() => setRun((r) => r + 1)}
              className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold"
            >
              <RotateCcw size={12} />
              Replay
            </button>
          </div>

          <div className="scan min-h-[19rem] p-5 font-mono text-[12.5px] leading-relaxed md:text-[13px]">
            {terminalLines.slice(0, count).map((line, i) => (
              <p key={`${run}-${i}`} className={tone[line.c] || "text-ink"}>
                {line.t || "\u00A0"}
              </p>
            ))}
            {!done && <span className="caret text-gold">_</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
