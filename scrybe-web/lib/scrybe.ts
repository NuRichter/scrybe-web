export type ScrybeResult =
  | {
      ok: true;
      docId: string;
      embedUrl: string;
      filename: string;
      sourceUrl: string;
    }
  | { ok: false; reason: string };

function filenameFromUrl(url: string): string {
  let path = url;
  try {
    const normalized = url.startsWith("http") ? url : `https://${url}`;
    path = new URL(normalized).pathname;
  } catch {
    path = url;
  }
  path = path.replace(/\/+$/, "");
  const segment = path.split("/").filter(Boolean).pop() || "scribd_document";
  let name = segment;
  try {
    name = decodeURIComponent(segment);
  } catch {
    name = segment;
  }
  return `${name}.pdf`;
}

export function parseScribd(raw: string): ScrybeResult {
  const url = raw.trim();
  if (!url) {
    return { ok: false, reason: "Empty. Paste a Scribd link first." };
  }
  const match = url.match(/scribd\.com\/(?:document|doc)\/(\d+)/i);
  if (!match) {
    return {
      ok: false,
      reason: "Not a Scribd document link. I need /document/ID or /doc/ID."
    };
  }
  const docId = match[1];
  return {
    ok: true,
    docId,
    embedUrl: `https://www.scribd.com/embeds/${docId}/content`,
    filename: filenameFromUrl(url),
    sourceUrl: url
  };
}
