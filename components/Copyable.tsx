"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function Copyable({
  value,
  label
}: {
  value: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      onClick={onCopy}
      className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-gold"
      aria-label={label || "Copy"}
    >
      {copied ? (
        <Check size={13} className="text-ok" />
      ) : (
        <Copy size={13} />
      )}
      {copied ? "Copied" : label || "Copy"}
    </button>
  );
}
