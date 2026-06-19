export default function NotFound() {
  return (
    <main
      data-testid="not-found-page"
      className="min-h-screen flex items-center justify-center p-4 bg-seazone-background"
    >
      <div className="bg-seazone-navy text-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
        <p className="text-seazone-coral text-xs font-bold uppercase tracking-widest mb-3">
          Código não encontrado
        </p>
        <h1 className="text-2xl font-bold mb-3">Imóvel não encontrado</h1>
        <p className="text-slate-300 text-sm leading-relaxed mb-2">
          O código informado não corresponde a nenhum imóvel cadastrado.
        </p>
        <p className="text-slate-400 text-sm leading-relaxed">
          Verifique o código recebido do seu anfitrião e tente novamente.
        </p>
      </div>
    </main>
  );
}
