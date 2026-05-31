"use client";

import { useEffect, useState } from "react";
import GithubMark from "./GithubMark";

const links = [
  { href: "#forge", label: "Forge" },
  { href: "#pipeline", label: "Pipeline" },
  { href: "#spec", label: "Spec" },
  { href: "#deploy", label: "Get it" }
];

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-void/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-mono text-gold">[</span>
          <span className="font-display text-xl font-bold tracking-[0.28em] text-ink">
            SCRYBE
          </span>
          <span className="font-mono text-gold">]</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="https://github.com/NuRichter/scrybe"
          className="inline-flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold hover:text-gold"
        >
          <GithubMark size={14} />
          Source
        </a>
      </nav>
    </header>
  );
}
