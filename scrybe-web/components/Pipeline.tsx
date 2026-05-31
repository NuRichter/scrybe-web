import { pipeline } from "@/lib/content";
import Reveal from "./Reveal";

export default function Pipeline() {
  return (
    <section id="pipeline" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-mono text-sm text-gold">03</span>
          <span className="label">The Pipeline // under the hood</span>
        </div>
        <h2 className="font-display text-5xl font-bold tracking-wide text-ink md:text-6xl">
          Seven steps. Then it leaves.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          For the people who want to look under the hood. Good. You should.
          Here is exactly what happens between your link and your file.
        </p>

        <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {pipeline.map((step, i) => (
            <Reveal key={step.id} delay={i * 70}>
              <article className="group relative h-full bg-void p-6 transition-colors hover:bg-panel">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-5xl font-bold text-gold/15 transition-colors group-hover:text-gold/35">
                    {step.id}
                  </span>
                  <span className="label">MODULE</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}
          <Reveal delay={pipeline.length * 70}>
            <div className="flex h-full flex-col justify-center bg-gold p-6 text-void">
              <span className="font-mono text-[11px] uppercase tracking-[0.26em]">
                Result
              </span>
              <p className="mt-3 font-display text-2xl font-bold leading-tight">
                One clean PDF. Named for you. No babysitting.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
