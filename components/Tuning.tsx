import { envVars } from "@/lib/content";

export default function Tuning() {
  return (
    <section className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-mono text-sm text-gold">05</span>
          <span className="label">Tuning // for monstrous files</span>
        </div>
        <h2 className="font-display text-5xl font-bold tracking-wide text-ink md:text-6xl">
          Give it more room.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          The defaults handle the common case. If a document is enormous, set an
          environment variable before you run it. That is the whole knob set.
        </p>

        <div className="mt-12 border border-line">
          <div className="hidden border-b border-line bg-panel px-6 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted md:grid md:grid-cols-[2fr_0.7fr_3fr] md:gap-4">
            <span>Variable</span>
            <span>Default</span>
            <span>What it controls</span>
          </div>
          {envVars.map((row) => (
            <div
              key={row.name}
              className="grid gap-2 border-b border-line px-6 py-5 last:border-b-0 md:grid-cols-[2fr_0.7fr_3fr] md:items-center md:gap-4"
            >
              <code className="break-all font-mono text-[13px] text-gold">
                {row.name}
              </code>
              <code className="font-mono text-[13px] text-ink">{row.def}</code>
              <p className="text-[14px] leading-relaxed text-muted">{row.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
