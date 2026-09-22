import "./App.css";
import TitleBar from './TitleBar.tsx';
import Typewriter from "./components/Typewriter.tsx";
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { getCurrentWindow } from '@tauri-apps/api/window'

  const arcanosMaiores: Record<number, { nome: string; imagem: string; texto: string }> = {
  0: { nome: "0 - O Louco", imagem: "/cartas/00.png", texto: "Simboliza a espontaneidade, a imprudência e a disposição para se aventurar pelo desconhecido. Representa o início de uma jornada marcada pela incerteza, onde ainda não se conhece o caminho ou o destino. A carta sugere seguir em frente com liberdade, mas sem permitir que a impulsividade transforme novas possibilidades em descuido."},
  1: { nome: "I - O Mago", imagem: "/cartas/01.png", texto: "Simboliza energia, potencial e a capacidade de transformar desejos em realidade. Representa a união entre o mundo espiritual e o mundo físico, utilizando habilidades e recursos para transformar possibilidades em ações concretas. A carta incentiva a reconhecer o próprio potencial e direcioná-lo de maneira consciente."},
  2: { nome: "II", imagem: "/cartas/02.png", texto: "Simboliza o desconhecido, o mistério, a intuição, o conhecimento espiritual e o subconsciente. Representa aquilo que ainda não foi revelado e que não pode ser compreendido apenas pela razão. A carta aconselha a observar em silêncio, confiar na própria intuição e permitir que aquilo que está oculto se revele no momento certo."},
  3: { nome: "III - A Imperatriz", imagem: "/cartas/03.png", texto: "Simboliza fertilidade, fecundidade, ação, iniciativa e abundância. Representa uma força criadora capaz de nutrir, sustentar e dar forma àquilo que está sendo desenvolvido. A carta incentiva a cultivar seus projetos e relações, permitindo que aquilo que foi iniciado cresça e alcance seu potencial."},
  4: { nome: "IV - O Imperador", imagem: "/cartas/04.png", texto:"Simboliza liderança, responsabilidade, estrutura, estabilidade e autoridade. Representa a capacidade de estabelecer ordem, proteger aquilo que foi construído e agir de maneira estratégica. A carta incentiva a assumir responsabilidades e utilizar disciplina e organização para transformar planos em algo sólido."},
  5: { nome: "V - O Hierofante", imagem: "/cartas/05.png", texto:"Simboliza retidão, espiritualidade, ordem hierárquica, tradição e valores estabelecidos. Representa o conhecimento transmitido através de ensinamentos, instituições ou pessoas que servem como orientação. A carta incentiva a buscar sabedoria e compreender os princípios que orientam suas escolhas, sem deixar de questionar aquilo que já está estabelecido." },
  6: { nome: "VI - Os Enamorados", imagem: "/cartas/06.png", texto:"Simboliza atração, amor, beleza, relacionamentos e escolhas. Representa uma decisão importante envolvendo aquilo que se ama ou valoriza, muitas vezes exigindo abrir mão de uma possibilidade para seguir outra. A carta lembra que escolhas feitas pelo coração podem trazer consequências duradouras e, por isso, devem ser tomadas com consciência." },
  7: { nome: "VII - O Carro", imagem: "/cartas/07.png", texto:"Simboliza vitória, avanço, determinação e a superação de conflitos. Representa a capacidade de seguir adiante mesmo quando forças opostas tentam conduzir a vida em direções diferentes. A carta incentiva a manter o controle, superar os obstáculos e direcionar sua força de vontade para alcançar aquilo que deseja." },
  8: { nome: "VIII - A Força", imagem: "/cartas/08.png", texto:"Simboliza poder, energia, coragem, ação e grandeza de espírito. Representa a capacidade de dominar forças intensas sem depender apenas da violência ou da imposição. A carta incentiva a enfrentar dificuldades com coragem e confiança, utilizando a própria força de maneira equilibrada e consciente." },
  9: { nome: "IX - O Eremita", imagem: "/cartas/09.png", texto:"Simboliza prudência, cautela e busca por compreensão. Representa a necessidade de observar atentamente os caminhos antes de avançar e de encontrar respostas através da reflexão. A carta aconselha a agir com discernimento, evitando decisões precipitadas e tomando cuidado para que a prudência não se transforme em medo ou isolamento." },
  10: { nome: "X - A Roda da Fortuna", imagem: "/cartas/10.png", texto:"Simboliza mudança, destino, fortuna e transformação das circunstâncias. Representa alterações na posição, na situação ou na própria sorte, fazendo com que aquilo que parecia estável possa mudar de direção. A carta lembra que a vida está em constante movimento e que tanto perdas quanto oportunidades fazem parte desses ciclos." },
  11: { nome: "XI - A Justiça", imagem: "/cartas/11.png", texto:"Simboliza equilíbrio, retidão, honestidade e responsabilidade. Representa a necessidade de avaliar as situações de maneira imparcial e reconhecer aquilo que é justo ou merecido. A carta incentiva a agir com integridade e compreender que as decisões tomadas trazem consequências proporcionais às próprias ações." },
  12: { nome: "XII - O Enforcado", imagem: "/cartas/12.png", texto:"Simboliza sabedoria, discernimento, intuição, sacrifício e um período de provação. Representa uma situação em que é necessário interromper o movimento habitual para enxergar as coisas de uma perspectiva diferente. A carta sugere aceitar a pausa e utilizar esse momento para compreender aquilo que antes não podia ser percebido." },
  13: { nome: "XIII - A Morte", imagem: "/cartas/13.png", texto:"Simboliza encerramento, transformação e mudança de uma antiga forma de pensar para uma nova. Representa o fim de uma situação, relação ou interesse e o consequente despertar para uma nova realidade. A carta lembra que a mudança é inevitável e que resistir ao encerramento de um ciclo pode impedir o início de outro." },
  14: { nome: "XIV - A Temperança", imagem: "/cartas/14.png", texto:"Simboliza moderação, economia, equilíbrio, administração e adaptação. Representa a capacidade de combinar diferentes elementos de maneira harmoniosa, evitando excessos e conflitos desnecessários. A carta incentiva a encontrar um ponto de equilíbrio e administrar os próprios recursos, desejos e relações com paciência." },
  15: { nome: "XV - O Diabo", imagem: "/cartas/15.png", texto:"Simboliza força, intensidade, desejo, violência e uma forte ligação com o material. Representa o apego ao conforto, ao prazer ou às circunstâncias que podem limitar a liberdade quando aceitas sem questionamento. A carta convida a reconhecer aquilo que exerce poder sobre você e compreender que nem tudo que parece inevitável precisa determinar suas escolhas." },
  16: { nome: "XVI - A Torre", imagem: "/cartas/16.png", texto:"Simboliza crise, perigo, destruição, adversidade e mudanças repentinas. Representa a queda inesperada de estruturas que pareciam seguras, trazendo à tona situações que não podiam mais permanecer como estavam. A carta, apesar de indicar momentos difíceis, também pode representar libertação e a oportunidade de reconstruir depois da ruptura." },
  17: { nome: "XVII - A Estrela", imagem: "/cartas/17.png", texto:"Simboliza esperança, perspectivas positivas e a possibilidade de renovação após um período de perda ou abandono. Representa a recuperação da confiança e a visão de um futuro mais favorável. A carta incentiva a manter a esperança e olhar para frente, mesmo depois de experiências que tenham causado dificuldades ou privações." },
  18: { nome: "XVIII - A Lua", imagem: "/cartas/18.png", texto:"Simboliza imaginação, medo, mistério, engano e aquilo que permanece oculto. Representa uma realidade iluminada apenas parcialmente, onde as aparências podem confundir e os medos podem influenciar a percepção. A carta aconselha a não se deixar dominar pelo desconhecido e buscar calma antes de confiar completamente naquilo que parece evidente." },
  19: { nome: "XIX - O Sol", imagem: "/cartas/19.png", texto:"Simboliza conhecimento alcançado, felicidade, contentamento, vitalidade, confiança e sucesso. Representa a superação dos medos e ilusões através da clareza e da descoberta da verdade. A carta traz uma mensagem de realização e renovação, incentivando a reconhecer aquilo que foi conquistado e seguir adiante com confiança." },
  20: { nome: "XX - O Julgamento", imagem: "/cartas/20.png", texto:"Simboliza mudança, renovação, resultado e um chamado para uma nova etapa. Representa o momento de reconhecer aquilo que passou e compreender suas consequências, abrindo espaço para uma transformação. A carta sugere deixar para trás aquilo que já cumpriu seu propósito e responder à oportunidade de recomeçar." },
  21: { nome: "XXI - O Mundo", imagem: "/cartas/21.png", texto:"Simboliza sucesso, realização, conclusão, recompensa e mudança de caminho. Representa a completude de uma jornada e a integração das experiências adquiridas ao longo dela. A carta celebra aquilo que foi conquistado e lembra que alcançar a plenitude também envolve compartilhar com o mundo aquilo que foi aprendido." },
  };
  
function App(){

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
      width: 500,
      height: 500,
      resizable: false
    });

    tiragemWindow.once('tauri://created', async () => {
        const janelaAtual = getCurrentWindow();
        await janelaAtual.hide();
    });
  }

  return (  
    <div className="w-screen h-screen flex rounded-2xl border-2 border-purple-400 bg-[url(/background.gif)]">
  
      <div className="flex flex-col w-screen items-center">

        <TitleBar />

        <img className="w-50 object-fill mt-20 floating hover:w-52 transition-transform active:w-50"
          src="/menu-card.png"
          onClick={abrirTiragem}>
        </img>

        <div className="font-pixel text-[26px] my-15 select-none text-zinc-200 floating text-center">
          <Typewriter text={"toque a carta\npara revelá-la"} speed={80}/>
        </div>

      </div>  
    
    </div>
  );
}

export default App;
