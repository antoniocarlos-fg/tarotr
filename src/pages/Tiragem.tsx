import { getCurrentWindow } from '@tauri-apps/api/window'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import TitleBar from '../components/TitleBar.tsx'

function Tiragem() {
  const params = new URLSearchParams(window.location.search);
  const nome = params.get('nome');
  const imagem = params.get('imagem');
  const texto = params.get('texto');

  async function voltar(){
    const janelaPrincipal = await WebviewWindow.getByLabel('main');
    if(janelaPrincipal){
        await janelaPrincipal.show();
        await janelaPrincipal.setFocus();
    }

    const janelaAtual = getCurrentWindow();
    await janelaAtual.close();
  }

  return (
    <div className="app-background flex h-screen w-screen flex-col overflow-hidden rounded-2xl border-2 border-purple-400 bg-zinc-950 text-zinc-100">
      <TitleBar onClose={voltar} />

      <main className="flex min-h-0 flex-1 gap-4 p-4">
        <div className="flex w-40 shrink-0 flex-col items-center gap-5 pt-5">
          <div className="tiragem-entrada w-full">
            <img
              className="floating block w-full drop-shadow-[0_0_16px_rgba(192,132,252,0.55)] select-none"
              src={imagem ?? undefined}
              alt={nome ?? "Carta de tarô"}
            />
          </div>

          <button
            type="button"
            onClick={voltar}
            className="font-pixel select-none rounded-lg border border-purple-300 bg-purple-950/85 px-5 py-3 text-sm text-zinc-100 shadow-[0_0_14px_rgba(168,85,247,0.35)] transition-all duration-200 hover:-translate-y-1 hover:bg-purple-800 hover:shadow-[0_0_20px_rgba(192,132,252,0.55)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
          >
            Voltar
          </button>
        </div>

        <section className="tiragem-entrada tiragem-entrada-atrasada flex min-h-0 min-w-0 flex-1 flex-col rounded-xl border border-purple-400/70 bg-zinc-950/80 shadow-[inset_0_0_20px_rgba(168,85,247,0.12)] backdrop-blur-sm">
          <div className="border-b border-purple-400/50 px-4 pb-3 pt-4">
            <span className="text-xs text-purple-300" aria-hidden="true">✦ ✧ ✦</span>
            <h1 className="font-pixel mt-2 text-lg leading-snug text-purple-100">{nome}</h1>
          </div>

          <div className="tiragem-texto min-h-0 flex-1 overflow-y-auto px-4 py-3">
            <p className="text-sm leading-6 text-zinc-100">{texto}</p>
          </div>
        </section>
      </main>
    </div>
  );        
}

export default Tiragem;
