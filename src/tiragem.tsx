import { getCurrentWindow } from '@tauri-apps/api/window'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'

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
    <div className="w-screen h-screen flex my-5">
        <div className="flex flex-col items-start my-3 mx-5 gap-2">
            <img className="w-50 object-fill" src={imagem ?? undefined} alt={nome ?? "Carta de tarô"} />
            <button onClick={voltar} className="select-none self-center p-2 rounded bg-blue-400 hover:bg-blue-600 active:translate-y-1 transition-transform text-white text-[20px]">
            Voltar</button>
        </div>

        <div className="flex flex-col mr-5 flex-1">
            <h1 className="text-[32px]">{nome}</h1>

            <p className="text-[16px]">{texto}</p>
        </div>
    </div>
  );        
}

export default Tiragem;