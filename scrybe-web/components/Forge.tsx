"use client";

import { useMemo, useRef, useState } from "react";
import {
  CircleAlert,
  Download,
  FileDown,
  Link2,
  Loader2,
  Play,
  Plug,
  RotateCcw,
  Terminal
} from "lucide-react";
import { parseScribd } from "@/lib/scrybe";
import Copyable from "./Copyable";

const sample = "https://www.scribd.com/document/238704121/Sample-Document";
const BRIDGE = "http://127.0.0.1:8787";

type Phase = "idle" | "working" | "done" | "error" | "offline";

function base64ToBlob(b64: string): Blob {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: "application/zip" });
}

function saveBlob(name: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

async function bridgeAlive(): Promise<boolean> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 1800);
  try {
    const res = await fetch(`${BRIDGE}/health`, { signal: ctrl.signal });
    const data = await res.json();
    return Boolean(data?.ok);
  } catch {
    return false;
  } finally {
    clearTimeout(t);
  }
}

export default function Forge() {
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [log, setLog] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [zip, setZip] = useState<{ name: string; blob: Blob; size: number } | null>(null);
  const busy = useRef(false);

  const parsed = useMemo(() => (input ? parseScribd(input) : null), [input]);
  const canRun = parsed !== null && parsed.ok && phase !== "working";

  const reset = (value: string) => {
    setInput(value);
    setPhase("idle");
    setLog([]);
    setError("");
    setZip(null);
  };

  const run = async () => {
    if (!parsed || !parsed.ok || busy.current) return;
    busy.current = true;
    setPhase("working");
    setLog([]);
    setError("");
    setZip(null);

    const alive = await bridgeAlive();
    if (!alive) {
      setPhase("offline");
      busy.current = false;
      return;
    }

    try {
      const res = await fetch(`${BRIDGE}/pull`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: input })
      });
      if (!res.body) throw new Error("nostream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finished = false;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, nl).trim();
          buffer = buffer.slice(nl + 1);
          if (!line) continue;
          const ev = JSON.parse(line);
          if (ev.type === "status") {
            setLog((l) => [...l, ev.msg]);
          } else if (ev.type === "error") {
            finished = true;
            setError(ev.msg);
            setPhase("error");
          } else if (ev.type === "done") {
            finished = true;
            const blob = base64ToBlob(ev.data);
            setZip({ name: ev.name, blob, size: ev.size });
            setPhase("done");
            saveBlob(ev.name, blob);
          }
        }
      }
      if (!finished) {
        setError("The bridge ended early. Try again.");
        setPhase("error");
      }
    } catch {
      setError("Lost the bridge mid run. Check the bridge window and try again.");
      setPhase("error");
    } finally {
      busy.current = false;
    }
  };

  return (
    <section id="forge" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-mono text-sm text-gold">02</span>
          <span className="label">The Forge // live download</span>
        </div>
        <h2 className="font-display text-5xl font-bold tracking-wide text-ink md:text-6xl">
          Paste it. Process. Take the zip.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          Scribd blocks cloud servers with a CAPTCHA, so the pull has to happen
          on your machine, not on Vercel. Start the local bridge once, then paste
          a link here and hit process. The bridge does the work on your own IP and
          your own Chrome, and the zip lands in your downloads. No CAPTCHA, no lie.
        </p>

        <div className="mt-10 bracket border border-line bg-panel/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <Link2 size={15} className="text-gold" />
            <input
              value={input}
              onChange={(e) => reset(e.target.value)}
              placeholder={sample}
              spellCheck={false}
              className="w-full bg-transparent font-mono text-[13px] text-ink outline-none placeholder:text-muted/50"
            />
            <button
              onClick={() => reset(sample)}
              className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold"
            >
              Use sample
            </button>
          </div>

          <div className="p-5 md:p-7">
            {!parsed && (
              <p className="font-mono text-[13px] text-muted">
                Awaiting a Scribd link. I will not move until you give me one.
              </p>
            )}

            {parsed && !parsed.ok && (
              <div className="flex items-start gap-3 font-mono text-[13px] text-gold">
                <CircleAlert size={16} className="mt-0.5 shrink-0" />
                <span>{parsed.reason}</span>
              </div>
            )}

            {parsed && parsed.ok && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Embed URL" value={parsed.embedUrl} icon={<Link2 size={14} />} />
                  <Field
                    label="Will save as"
                    value={parsed.filename.replace(/\.pdf$/i, ".zip")}
                    icon={<FileDown size={14} />}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={run}
                    disabled={!canRun}
                    className="inline-flex items-center gap-2 bg-gold px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-void transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {phase === "working" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Processing
                      </>
                    ) : (
                      <>
                        <Play size={15} />
                        Process and download
                      </>
                    )}
                  </button>

                  {phase === "done" && zip && (
                    <button
                      onClick={() => saveBlob(zip.name, zip.blob)}
                      className="inline-flex items-center gap-2 border border-gold px-6 py-3 font-mono text-[12px] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-void"
                    >
                      <Download size={15} />
                      Download again
                    </button>
                  )}

                  {(phase === "done" || phase === "error" || phase === "offline") && (
                    <button
                      onClick={run}
                      className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold"
                    >
                      <RotateCcw size={13} />
                      Try again
                    </button>
                  )}
                </div>

                {(phase === "working" || phase === "done" || phase === "error") && (
                  <div className="border border-line bg-[#060608] p-4 font-mono text-[12.5px] leading-relaxed">
                    {log.map((line, i) => (
                      <p key={i} className="text-muted">
                        <span className="text-gold/60">{">"}</span> {line}
                      </p>
                    ))}
                    {phase === "working" && (
                      <p className="text-gold">
                        <span className="caret">_</span>
                      </p>
                    )}
                    {phase === "done" && zip && (
                      <p className="mt-2 text-ok">
                        Done. {zip.name} saved, {(zip.size / 1024).toFixed(0)} KB.
                        Browser closed.
                      </p>
                    )}
                    {phase === "error" && (
                      <p className="mt-2 flex items-start gap-2 text-gold">
                        <CircleAlert size={15} className="mt-0.5 shrink-0" />
                        {error}
                      </p>
                    )}
                  </div>
                )}

                {phase === "offline" && <BridgeOffline sourceUrl={parsed.sourceUrl} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BridgeOffline({ sourceUrl }: { sourceUrl: string }) {
  return (
    <div className="border border-gold/40 bg-gold/5 p-5">
      <div className="flex items-center gap-2 text-gold">
        <Plug size={16} />
        <span className="font-mono text-[12px] uppercase tracking-[0.22em]">
          Bridge not running
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-muted">
        The pull cannot run on Vercel, because Scribd hits cloud IPs with a
        CAPTCHA. The bridge runs it on your machine instead. Start it once and
        leave it open, then hit process again.
      </p>
      <div className="mt-4 space-y-3">
        <Step n="01" label="Get the engine repo" cmd="git clone https://github.com/NuRichter/scrybe.git && cd scrybe" />
        <Step n="02" label="Install once" cmd="pip install -r requirements.txt" />
        <Step n="03" label="Start the bridge, leave it running" cmd="python bridge.py" />
      </div>
      <details className="mt-4">
        <summary className="flex cursor-pointer items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold">
          <Terminal size={13} />
          Or skip the website and run the CLI
        </summary>
        <div className="mt-3 border border-line bg-void/60 p-4">
          <p className="font-mono text-[13px] text-ink">
            <span className="text-gold">$</span> python scrybe.py
          </p>
          <p className="mt-1 break-all font-mono text-[13px] text-muted">
            then paste <span className="text-ink">{sourceUrl}</span>
          </p>
        </div>
      </details>
    </div>
  );
}

function Step({ n, label, cmd }: { n: string; label: string; cmd: string }) {
  return (
    <div className="border border-line bg-void/50 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="label">
          {n} // {label}
        </span>
        <Copyable value={cmd} />
      </div>
      <code className="block break-all font-mono text-[12.5px] text-ink">
        <span className="text-gold">$</span> {cmd}
      </code>
    </div>
  );
}

function Field({
  label,
  value,
  icon
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border border-line bg-void/40 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 label">
          <span className="text-gold">{icon}</span>
          {label}
        </span>
        <Copyable value={value} />
      </div>
      <p className="break-all font-mono text-[13px] text-ink">{value}</p>
    </div>
  );
}
