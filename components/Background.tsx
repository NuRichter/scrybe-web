export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 blueprint opacity-60" />
      <div className="absolute inset-x-0 top-0 h-[70vh] glow-gold" />
      <div className="absolute left-1/2 top-[-10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gold/5 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-gold/4 blur-[120px]" />
    </div>
  );
}
