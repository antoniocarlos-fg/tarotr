# Guia para agentes — tarotr

## Propósito e forma de colaboração

Este é um projeto pessoal de aprendizado: uma aplicação desktop de tiragem de tarô. O objetivo de cada intervenção é ajudar o autor a **entender o sistema e as escolhas técnicas**, além de fazer a funcionalidade funcionar. Comunique-se em português do Brasil, usando os nomes das APIs e dos arquivos quando necessário.

- Antes de uma alteração relevante, explique brevemente o comportamento atual, o problema observado e a mudança pretendida. Durante o trabalho, destaque descobertas que mudem a direção da solução.
- Prefira passos pequenos, legíveis e fáceis de revisar. Ao concluir, explique o que mudou, por que mudou, como foi verificado e quais limitações restam. Mostre o raciocínio de decisões não óbvias e a ligação entre os conceitos (React, Vite e Tauri).
- Quando houver alternativas técnicas com consequências diferentes, apresente o critério da escolha e o impacto no projeto. Use exemplos curtos ou indique trechos específicos do código para facilitar o estudo.
- Não faça grandes refatorações, adicione abstrações ou dependências, nem substitua a arquitetura por conveniência sem uma necessidade concreta. Preserve o escopo do pedido e o estilo existente quando isso não atrapalhar a clareza.
- Corrija problemas encontrados que sejam necessários para cumprir o pedido; para problemas fora do escopo, registre a evidência e a consequência prática. Não esconda falhas de build ou de execução.
- Peça esclarecimento apenas quando a decisão depender de uma preferência real do autor. Avance com o que puder ser verificado de modo independente.

## Visão geral da arquitetura atual

- **Tauri 2** empacota a interface como aplicação desktop e fornece as APIs de janelas. A configuração da janela inicial está em `src-tauri/tauri.conf.json`; a capability de `src-tauri/capabilities/default.json` concede as permissões usadas para criar, ocultar, exibir, focar, minimizar e fechar janelas.
- **Rust** é a camada de inicialização do Tauri. `src-tauri/src/main.rs` chama `tarotr_lib::run()`, definido em `src-tauri/src/lib.rs`. Este último registra o plugin `opener` e um comando `greet` do template, sem uso no fluxo de tiragem atual. A lógica de sorteio está no frontend, não em comandos Rust.
- **React 19 + TypeScript** implementam a interface. **Vite 8** compila duas entradas HTML independentes: `index.html` → `src/entries/inicio.tsx` → `src/pages/Inicio.tsx` e `tiragem.html` → `src/entries/tiragem.tsx` → `src/pages/Tiragem.tsx`. As entradas HTML são declaradas em `vite.config.ts`.
- **Tailwind CSS 4** é carregado por `src/styles/app.css` nas duas entradas. O mesmo arquivo define a fonte pixel, o fundo e as animações. `src/assets/` guarda recursos da interface; os importados são processados pelo Vite. As 22 imagens dos arcanos maiores (`00.png` a `21.png`) ficam em `public/cartas/`, pois seus caminhos absolutos são passados à janela de tiragem pela URL. `public/favicon.png` é servido diretamente pelas duas páginas HTML.
- O projeto é inicial e usa texto/interface em **pt-BR**. Não há infraestrutura de i18n no código atual.

## Fluxo funcional

1. O Tauri inicia a janela principal, sem decoração nativa, com a interface de `src/pages/Inicio.tsx`. `TitleBar.tsx` fornece área de arrasto e botões de minimizar/fechar. `Typewriter.tsx` anima o desenho do texto.
2. Ao clicar na imagem da carta, `abrirTiragem()` sorteia um índice com `Math.random()` entre as entradas de `arcanosMaiores`, catálogo definido em `src/data/arcanosMaiores.ts` com nome, imagem e interpretação de cada carta.
3. O frontend cria uma `WebviewWindow` com o rótulo `tiragem` e URL `tiragem.html` contendo `nome`, `imagem` e `texto` em `URLSearchParams`. Após o evento de criação, oculta a janela principal.
4. `src/pages/Tiragem.tsx` lê esses parâmetros da URL e mostra a carta. O botão **Voltar** busca a janela `main`, exibe e foca essa janela, e fecha a janela `tiragem`.

Esse fluxo depende das permissões da capability e dos rótulos `main`/`tiragem`. Ao alterar a navegação, revise as duas entradas, o ciclo de vida das janelas e as permissões em conjunto. A página de tiragem recebe dados pela URL; não há estado global compartilhado, armazenamento persistente, serviço remoto ou histórico de leituras implementado.

## Mapa de arquivos

| Caminho | Papel |
| --- | --- |
| `src/pages/Inicio.tsx` | Sorteio, tela inicial e criação da janela de tiragem. |
| `src/pages/Tiragem.tsx` | Leitura dos parâmetros, apresentação da carta e retorno à janela inicial. |
| `src/data/arcanosMaiores.ts` | Catálogo dos arcanos maiores e caminhos das imagens. |
| `src/components/TitleBar.tsx` | Barra de título compartilhada pelas duas janelas. |
| `src/components/Typewriter.tsx` | Efeito de digitação da chamada na tela inicial. |
| `src/components/TarotCard.tsx` | Carta interativa com inclinação no hover. |
| `src/styles/app.css` | Tailwind, fundo, fonte e animações compartilhados. |
| `src/entries/` | Pontos de montagem React das duas páginas. |
| `src/assets/` | Recursos incorporados ao build pelo Vite. |
| `public/cartas/` | Imagens servidas em URLs estáveis para a janela de tiragem. |
| `vite.config.ts` | Integração React/Tailwind, servidor de desenvolvimento Tauri e build com duas entradas. |
| `src-tauri/tauri.conf.json` | Configuração do aplicativo, janela inicial e comandos de build. |
| `src-tauri/capabilities/default.json` | Permissões Tauri para `main` e `tiragem`. |
| `src-tauri/src/` | Inicialização Rust e código ainda herdado do template. |

## Desenvolvimento e verificação

- Instale dependências com `npm install` (ou `npm ci` para usar exatamente o lockfile).
- Use `npm run tauri dev` para testar o comportamento desktop e a navegação entre janelas. `npm run dev` inicia apenas o Vite; as APIs de janela do Tauri exigem o ambiente Tauri para o fluxo completo.
- `npm run build` executa `tsc && vite build`. O Tauri usa esse mesmo build em `npm run tauri build`. Ao mexer em TypeScript ou na configuração, execute o build e relate o resultado. Para mudanças visuais ou no ciclo das janelas, verifique também no aplicativo desktop quando o ambiente permitir.
- Não há script de testes automatizados ou lint configurado em `package.json`. Se testes forem introduzidos, priorize casos que validem comportamento relevante, sem duplicar a implementação.

### Estado conhecido na data deste guia

- `npm run build` passou na reorganização de arquivos. Execute-o novamente após mudanças em imports, entradas HTML ou caminhos de assets.
- A criação da janela de tiragem trata apenas o evento de sucesso (`tauri://created`). Uma falha de criação ou uma tentativa de abrir outra janela com o mesmo rótulo ainda não têm tratamento explícito.
- O comando Rust `greet` e o plugin `opener` ainda vêm do template e não participam da tiragem. Não presuma que sejam funcionalidades concluídas; ao limpá-los, explique a função atual e confirme o efeito no build e na experiência do usuário.

## Critérios para alterações futuras

- Mantenha o catálogo de cartas coerente com os arquivos em `public/cartas/` e com a forma como o sorteio escolhe os índices. Explique ao autor qualquer mudança na representação dos dados ou na probabilidade do sorteio.
- Trate os parâmetros da URL como dados de entrada na página de tiragem. Se a comunicação entre janelas mudar, documente o novo caminho dos dados e seus efeitos em recarga, estado e permissões.
- Ao adicionar APIs Tauri, conceda apenas as permissões necessárias e indique por que cada uma é necessária. Revise as capabilities para ambas as janelas.
- Preserve textos voltados ao usuário em pt-BR até que haja uma decisão explícita de internacionalização.
- Prefira relatar a verificação real (comando, resultado e limite) a declarar sucesso por inspeção. O foco é permitir que o autor reproduza e compreenda a mudança.
