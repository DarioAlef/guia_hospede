import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#0B192C] text-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">Imóvel não encontrado</h1>
        <p className="text-slate-300 text-sm mb-6">
          O código informado não corresponde a nenhum imóvel cadastrado.
        </p>
        <Link
          href="/"
          className="inline-block text-sm text-slate-400 hover:text-white transition-colors"
        >
          Voltar ao inicio
        </Link>
      </div>
    </main>
  );
}
