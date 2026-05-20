export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left: form */}
      <div className="w-full max-w-md flex flex-col justify-center px-10 py-12 bg-[var(--bg)]">
        {children}
      </div>
      {/* Right: illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-[var(--sidebar-bg)] relative overflow-hidden">
        <div className="text-center space-y-4 px-12">
          <div className="text-8xl select-none">📚</div>
          <p className="text-2xl font-bold text-[var(--text-1)]">
            Estude com <span className="text-[var(--primary)]">estratégia</span>
          </p>
          <p className="text-[var(--text-2)] max-w-xs mx-auto">
            Planejamento inteligente com acompanhamento personalizado do seu professor.
          </p>
        </div>
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, var(--primary) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
      </div>
    </div>
  );
}
