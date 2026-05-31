import { Terminal } from "lucide-react";
import Copyable from "./Copyable";

const steps = [
  { label: "Clone it", cmd: "git clone https://github.com/NuRichter/scrybe.git" },
  { label: "Enter it", cmd: "cd scrybe" },
  { label: "Install", cmd: "pip install -r requirements.txt" },
  { label: "Run it", cmd: "python scrybe.py" }
];

export default function Deploy() {
  return (
    <section id="deploy" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-mono text-sm text-gold">07</span>
          <span className="label">Get it // four steps, no more</span>
        </div>
        <h2 className="font-display text-5xl font-bold tracking-wide text-ink md:text-6xl">
          Setup is short. On purpose.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          You need Python 3.7 or higher and Google Chrome installed. The driver
          is handled for you. If you were expecting twelve more steps, I do not
          do twelve more steps.
        </p>

        <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
          {steps.map((s, i) => (
            <div key={s.cmd} className="bg-void p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="label">
                  Step {String(i + 1).padStart(2, "0")} // {s.label}
                </span>
                <Copyable value={s.cmd} />
              </div>
              <code className="flex items-center gap-3 break-all border border-line bg-[#060608] px-4 py-3 font-mono text-[13px] text-ink">
                <Terminal size={14} className="shrink-0 text-gold" />
                {s.cmd}
              </code>
            </div>
          ))}
        </div>

        <div className="mt-px border border-line border-t-0 bg-gold p-7 text-void">
          <p className="font-display text-2xl font-bold leading-tight">
            The site deploys static. The download runs through the local bridge.
          </p>
          <p className="mt-2 max-w-2xl font-mono text-[13px] leading-relaxed">
            Fork the web repo, import it on Vercel, hit deploy. Zero config, no
            server, goes up in seconds. Scribd blocks cloud IPs with a CAPTCHA, so
            the actual pull happens on your machine through the Scrybe bridge,
            which the site talks to at localhost. Start the bridge once and the
            process button just works.
          </p>
        </div>
      </div>
    </section>
  );
}
