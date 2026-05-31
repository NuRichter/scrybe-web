"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { fieldNotes } from "@/lib/content";

export default function FieldNotes() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-mono text-sm text-gold">06</span>
          <span className="label">Field Notes // when it breaks</span>
        </div>
        <h2 className="font-display text-5xl font-bold tracking-wide text-ink md:text-6xl">
          It is almost always Chrome.
        </h2>

        <div className="mt-12 border-t border-line">
          {fieldNotes.map((note, i) => {
            const isOpen = open === i;
            return (
              <div key={note.q} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="flex items-center gap-5">
                    <span className="font-mono text-xs text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl font-semibold tracking-wide text-ink md:text-2xl">
                      {note.q}
                    </span>
                  </span>
                  <Plus
                    size={20}
                    className={`shrink-0 text-gold transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] pb-7" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pl-10 text-[15px] leading-relaxed text-muted">
                      {note.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
