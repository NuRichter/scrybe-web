import { spec } from "@/lib/content";
import Reveal from "./Reveal";

export default function Spec() {
  return (
    <section id="spec" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-mono text-sm text-gold">04</span>
          <span className="label">The Spec // why it does not choke</span>
        </div>
        <h2 className="font-display text-5xl font-bold tracking-wide text-ink md:text-6xl">
          No padding. Just what it does.
        </h2>

        <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
          {spec.map((item, i) => (
            <Reveal key={item.k} delay={i * 60}>
              <div className="group flex h-full gap-5 bg-void p-7 transition-colors hover:bg-panel">
                <span className="mt-1 font-mono text-xs text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-wide text-ink">
                    {item.k}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">
                    {item.v}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
