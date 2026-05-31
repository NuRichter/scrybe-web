export const pipeline = [
  {
    id: "01",
    title: "URL conversion",
    body: "Your document link gets turned into the embeddable content URL. String work, instant."
  },
  {
    id: "02",
    title: "Headless browser",
    body: "Chrome opens in the background, invisible. No window jumps into your face."
  },
  {
    id: "03",
    title: "Page loading",
    body: "It scrolls every page so Scribd stops being lazy and actually loads the content."
  },
  {
    id: "04",
    title: "Cleanup",
    body: "Toolbars, cookie banners, overlays gone. The layout classes that rendering needs stay."
  },
  {
    id: "05",
    title: "Render settle",
    body: "It waits for fonts, images, and geometry to stop moving before it prints anything."
  },
  {
    id: "06",
    title: "PDF export",
    body: "It reads the real page size and prints through Chrome DevTools, streamed for big files."
  },
  {
    id: "07",
    title: "Auto close",
    body: "Browser shuts itself down once the file is saved. You do nothing."
  }
];

export const spec = [
  {
    k: "Both link styles",
    v: "Modern /document/ID and the old /doc/ID. Both work. Stop checking which one you have."
  },
  {
    k: "Built for heavy files",
    v: "Long driver timeout plus streamed export, so six hundred pages do not choke halfway."
  },
  {
    k: "Math survives",
    v: "Fonts and SVG settle before print, and equation layout classes stay intact. Formulas stay formulas."
  },
  {
    k: "Honest pagination",
    v: "Real Scribd page wrappers, so you do not get a tail of blank pages you never asked for."
  },
  {
    k: "Size is detected",
    v: "It reads the rendered page size instead of forcing one fixed sheet onto your document."
  },
  {
    k: "Clean output",
    v: "No cookie banners, no floating toolbars, no watermark bolted on. Just the document."
  }
];

export const envVars = [
  {
    name: "SCRIBD_CDP_TIMEOUT",
    def: "600",
    note: "ChromeDriver timeout in seconds for the print step. Raise it for monstrous files."
  },
  {
    name: "SCRIBD_RENDER_SETTLE_TIMEOUT",
    def: "30",
    note: "Max wait for fonts, images, and layout to settle before export."
  },
  {
    name: "SCRIBD_SCROLL_DELAY",
    def: "0.15",
    note: "Delay between page scrolls when forcing lazy loaded pages to render."
  },
  {
    name: "SCRIBD_PDF_STREAM_CHUNK_SIZE",
    def: "1048576",
    note: "Chunk size when reading a streamed PDF response from Chrome."
  },
  {
    name: "SCRIBD_HEADLESS",
    def: "1",
    note: "Set to 0 to watch a visible browser when you want to debug rendering."
  }
];

export const fieldNotes = [
  {
    q: "ChromeDriver not found",
    a: "Most of the time it is Chrome, not Scrybe. Selenium auto fetches the driver. If it sulks, run pip install --upgrade selenium and try again."
  },
  {
    q: "PDF will not save",
    a: "Check you can write to the current folder. Check the link is valid and reachable. For very large documents, raise SCRIBD_CDP_TIMEOUT."
  },
  {
    q: "The page counter looks too high",
    a: "Relax. Scribd spawns extra internal page elements while lazy loading. That counter is a loading indicator, not your final page count. The PDF will be correct."
  },
  {
    q: "Blank pages in the PDF",
    a: "Some documents carry DRM, and not every wall comes down. Raise SCRIBD_SCROLL_DELAY, or run with SCRIBD_HEADLESS=0 and watch it work."
  }
];

export const terminalLines = [
  { t: "$ python scrybe.py", c: "muted" },
  { t: "", c: "muted" },
  { t: "  NuRichter Workspace . Scribd -> PDF . no login, no drama", c: "gold" },
  { t: "", c: "muted" },
  { t: "Scribd link: https://www.scribd.com/document/903361807/Sample", c: "ink" },
  { t: "", c: "muted" },
  { t: "Link embed: https://www.scribd.com/embeds/903361807/content", c: "ink" },
  { t: "Output filename: Sample.pdf", c: "ink" },
  { t: "Starting Chrome browser...", c: "muted" },
  { t: "Cookie dialogs hidden.", c: "muted" },
  { t: "Found 316 pages, scrolling...", c: "ink" },
  { t: "  Detected 617 pages after lazy loading, continuing...", c: "muted" },
  { t: "All 617 pages loaded.", c: "ink" },
  { t: "Print CSS injected.", c: "muted" },
  { t: "Document render settled before export.", c: "muted" },
  { t: "Saving PDF as: Sample.pdf", c: "gold" },
  { t: "  Page size: 10.44\" x 13.50\" (from .outer_page)", c: "muted" },
  { t: "PDF saved successfully.", c: "ok" },
  { t: "Browser closed.", c: "muted" }
];
