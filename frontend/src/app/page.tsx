export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#0B192C] rounded-2xl p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-white mb-2">Seazone</h1>
          <p className="text-slate-300 text-sm">Guia Digital do Hóspede</p>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          Acesse o guia do seu imóvel pelo link enviado pelo anfitrião.
        </p>
      </div>
    </main>
  );
}
