import { ArrowRight, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative px-5 pt-32 pb-20 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px w-10 bg-gold" />
          <span className="label">NuRichter Workspace // Field Tool 001</span>
        </div>

        <h1 className="font-display text-[19vw] font-bold leading-[0.82] tracking-[0.02em] text-ink md:text-[12rem]">
          SCRYBE
        </h1>

        <div className="mt-2 h-3 w-full max-w-xl tick opacity-70" />

        <div className="mt-10 grid gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
              Paste a link. Get a PDF. That is the whole deal.
            </p>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              No login. No account. No drama. If Scribd renders it on screen,
              Scrybe pulls it down clean. Big document, six hundred pages, math
              all over it. Calm down. It was built for that.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#forge"
                className="sweep relative inline-flex items-center gap-2 overflow-hidden bg-gold px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.22em] text-void transition-transform hover:-translate-y-0.5"
              >
                Process a document
                <ArrowRight size={15} />
              </a>
              <a
                href="#deploy"
                className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-[12px] uppercase tracking-[0.22em] text-ink transition-colors hover:border-gold hover:text-gold"
              >
                <Terminal size={15} />
                Deploy your own
              </a>
            </div>
          </div>

          <div className="float relative">
            <div className="bracket border border-line bg-panel/70 p-5 backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
                <span className="ml-auto font-mono text-[10px] tracking-[0.2em] text-muted">
                  scrybe.py
                </span>
              </div>
              <pre className="overflow-hidden font-mono text-[11px] leading-relaxed text-gold/90">
{`  ____   ____ ______   ______
 / ___| / ___|  _ \\ \\ / / __ )
 \\___ \\| |   | |_) \\ V /|  _ \\
  ___) | |___|  _ < | | | |_) |
 |____/ \\____|_| \\_\\|_| |____/`}
              </pre>
              <div className="mt-4 space-y-1.5 font-mono text-[11px] text-muted">
                <p>
                  <span className="text-ink">link</span> &gt; scribd.com/document/ID
                </p>
                <p>
                  <span className="text-ink">out</span> &gt; Document-Title.pdf
                </p>
                <p className="text-ok">status &gt; saved, browser closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
