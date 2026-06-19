import Link from "next/link";

export default function NotFound() {
  return (
    <main
      data-testid="not-found-page"
      className="min-h-screen flex items-center justify-center p-4 bg-seazone-background"
    >
      <div className="bg-seazone-navy text-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
        <p className="text-seazone-coral text-xs font-bold uppercase tracking-widest mb-3">
          Erro 404
        </p>
        <h1 className="text-2xl font-bold mb-3">Página não encontrada</h1>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          A página que você procura não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="inline-block rounded-xl bg-seazone-coral px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
