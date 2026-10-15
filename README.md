# tarotr

Aplicativo desktop de tiragem de tarô desenvolvido como projeto pessoal de aprendizado com **Tauri 2**, **React**, **TypeScript**, **Vite** e **Tailwind CSS**.

> 🚧 Em desenvolvimento. A experiência atual cobre a tiragem de uma carta dos 22 arcanos maiores. A interface está em português do Brasil.

## O que o aplicativo faz

- Mostra uma tela inicial com um fundo animado, animação de texto e uma carta em pixel art com responsividade em 3D ao movimento do mouse.
- Sorteia um dos 22 arcanos maiores ao clicar na carta.
- Abre a carta sorteada em uma segunda janela, com nome e interpretação. O botão **Voltar** retorna à tela inicial para uma nova tiragem.
- Usa uma barra de título própria nas duas janelas, sem a moldura padrão do sistema.

A versão atual não inclui arcanos menores, cartas invertidas, histórico de tiragens ou persistência de dados.

## Executar localmente

Para rodar o aplicativo desktop, é necessário ter Node.js, npm, Rust e os pré-requisitos do Tauri para o seu sistema operacional instalados.

```bash
git clone https://github.com/antoniocarlos-fg/tarotr.git
cd tarotr
npm ci
npm run tauri dev
```

Para conferir a compilação do frontend:

```bash
npm run build
```

`npm run dev` inicia apenas o servidor Vite. Para testar a criação e a navegação entre janelas, use `npm run tauri dev`.

## Como está organizado

| Caminho | Função |
| --- | --- |
| `src/App.tsx` | Catálogo de cartas, sorteio e criação da janela de tiragem. |
| `src/tiragem.tsx` | Exibição da carta sorteada e retorno à janela inicial. |
| `src/components/` | Animações da carta inicial e do texto. |
| `src/TitleBar.tsx` | Barra de título usada pelas duas janelas. |
| `src/App.css` | Estilos compartilhados, fonte pixel e animações. |
| `public/cartas/` | Imagens dos 22 arcanos maiores. |
| `src-tauri/` | Configuração, permissões e inicialização do aplicativo Tauri. |

O sorteio acontece no frontend. A tela inicial passa o nome, a imagem e a interpretação da carta para a janela de tiragem pela URL. O código Rust atualmente inicializa o Tauri; a lógica da tiragem não depende de comandos Rust.

## Créditos

Arte pixel das cartas de tarô por **Jose Angel Canabal** ([jcanabal](https://jcanabal.itch.io/major-arcana-pixel-art-free)).

## Licença

Este repositório é distribuído sob a [licença MIT](LICENSE.md).
