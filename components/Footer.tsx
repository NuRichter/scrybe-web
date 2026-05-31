import { Star } from "lucide-react";
import GithubMark from "./GithubMark";

export default function Footer() {
  return (
    <footer className="relative border-t border-line px-5 pb-14 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-gold">[</span>
              <span className="font-display text-3xl font-bold tracking-[0.26em] text-ink">
                SCRYBE
              </span>
              <span className="font-mono text-gold">]</span>
            </div>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-muted">
              A NuRichter Workspace tool. Built by NuRichter, Ibnu Khoirul Anwar.
              Read the disclaimer below. I am not going to soften it.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/NuRichter/scrybe"
              className="inline-flex items-center gap-2 border border-line px-5 py-3 font-mono text-[12px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold hover:text-gold"
            >
              <GithubMark size={15} />
              Source
            </a>
            <a
              href="https://github.com/NuRichter/scrybe/stargazers"
              className="inline-flex items-center gap-2 bg-gold px-5 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-void transition-transform hover:-translate-y-0.5"
            >
              <Star size={15} />
              Drop a star
            </a>
          </div>
        </div>

        <div className="mt-12 border border-line bg-panel/50 p-6">
          <span className="label">Disclaimer</span>
          <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-muted">
            This tool is for educational purposes. Respect copyright law and
            respect Scribd Terms of Service. Only download documents you actually
            have the right to access. What you do with Scrybe is on you, not on
            NuRichter Workspace.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:flex-row md:items-center md:justify-between">
          <span>MIT License // Credit stays where credit is due</span>
          <span>
            Rebranded from the open source Scribd Downloader by Usama Nazir
          </span>
        </div>
      </div>
    </footer>
  );
}
