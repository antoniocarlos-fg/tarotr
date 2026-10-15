import TitleBar from '../components/TitleBar.tsx';
import Typewriter from "../components/Typewriter.tsx";
import TarotCard from "../components/TarotCard.tsx";
import { arcanosMaiores } from '../data/arcanosMaiores.ts';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { getCurrentWindow } from '@tauri-apps/api/window'

function Inicio(){

  function abrirTiragem(){
    const qtdArcanosMaiores = Object.keys(arcanosMaiores).length;
    const indiceSorteado = Math.floor(Math.random() * qtdArcanosMaiores);
    const cartaTirada = arcanosMaiores[indiceSorteado];

    const params = new URLSearchParams({
    nome: cartaTirada.nome,
    imagem: cartaTirada.imagem,
    texto: cartaTirada.texto
  });

    const tiragemWindow = new WebviewWindow('tiragem', {
      url: `./tiragem.html?${params.toString()}`,
      title: 'tiragem',
      width: 600,
      height: 520,
      decorations: false,
      transparent: true,
      resizable: false
    });

    tiragemWindow.once('tauri://created', async () => {
        const janelaAtual = getCurrentWindow();
        await janelaAtual.hide();
    });
  }

  return (  
    <div className="app-background w-screen h-screen flex rounded-2xl border-2 border-purple-400">
  
      <div className="flex flex-col w-screen items-center">

        <TitleBar />

        <div className="mt-20 floating">
          <TarotCard onClick={abrirTiragem} />
        </div>

        <div className="font-pixel text-[26px] my-15 select-none text-zinc-200 floating text-center">
          <Typewriter text={"toque a carta\npara revelá-la"} speed={80}/>
        </div>

      </div>  
    
    </div>
  );
}

export default Inicio;
