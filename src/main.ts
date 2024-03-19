import blessed from 'blessed';
import { Page } from './classes/page';

const colors = {
    green: [
        '#0d323b',
        '#114d44',
        '#127a3e',
        '#5ab03f',
        '#b5d96c'
    ]
}

function main() {
    const myPages: Array<Page> = [
        new Page('PatroHome', 'Página inicial do PatroTerminal.'),
        new Page('PatroConfig', 'Configurações do PatroTerminal.'),
        new Page('PatroHelp', 'Ajuda do PatroTerminal.')
    ];

    // Cria uma tela: container para todos os elementos da interface.
    var screen = blessed.screen({
        smartCSR: true,
        title: 'PatroTerminal'
    });

    // Cria uma caixa de texto.
    const text = blessed.text( {
        top: 'top', // Alinhar o texto verticalmente ao centro
        left: 'center', // Alinhar o texto horizontalmente ao centro
        content: 'Bem-vindo ao PatroTerminal!', // Conteúdo do texto
        tags: true, // Permite usar tags de formatação de texto
        style: {
            fg: colors.green[4], // Cor do texto (branco)
        }
    });

    // Cria uma box:
    const container = blessed.box({
        top: 'center',
        left: 'center',
        width: '100%-1',
        height: '50%',
        border: {
          type: 'line'
        },
        style: {
          fg: 'white',
          bg: 'blue',
          border: {
            fg: '#f0f0f0'
          }
        },
        tags: true, // Permitir o uso de tags de formatação de texto
        content: 'Conteúdo da caixa'
      });

    // Crie um botão
    const button1 = blessed.button({
        parent: container, // Adicione o botão à caixa
        bottom: 1, // Posição vertical do botão
        left: 'center', // Posição horizontal do botão
        content: 'Clique aqui!', // Conteúdo do botão
        style: {
            fg: 'black', // Cor do texto do botão (preto)
            bg: 'white', // Cor de fundo do botão (branco)
            focus: {
                fg: 'white', // Cor do texto do botão quando em foco (branco)
                bg: 'blue' // Cor de fundo do botão quando em foco (azul)
            }
        },
        align: 'center', // Alinhar o conteúdo do botão ao centro
        width: 15, // Largura do botão
        height: 3, // Altura do botão
        border: {
        type: 'line' // Tipo de borda do botão (linha)
        }
    });

    // Crie outro botão
    const button2 = blessed.button({
        parent: container, // Adicione o botão à caixa
        bottom: 6, // Posição vertical do botão
        left: 'center', // Posição horizontal do botão
        content: 'Clique aaa!', // Conteúdo do botão
        style: {
            fg: 'black', // Cor do texto do botão (preto)
            bg: 'white', // Cor de fundo do botão (branco)
            focus: {
                fg: 'white', // Cor do texto do botão quando em foco (branco)
                bg: 'blue' // Cor de fundo do botão quando em foco (azul)
            }
        },
        align: 'center', // Alinhar o conteúdo do botão ao centro
        width: 15, // Largura do botão
        height: 3, // Altura do botão
        border: {
        type: 'line' // Tipo de borda do botão (linha)
        }
    });

    // Adiciona a caixa de texto à tela.
    screen.append(text);
    screen.append(container);

    // Manipulador de eventos para o botão (quando o botão é pressionado)
    button1.on('press', () => {
        text.setContent('Botão clicado!');
        screen.render();
    });

    // Manipulador de eventos para o botão (quando o botão é pressionado)
    button2.on('press', () => {
        text.setContent('Botão 2 clicado!');
        screen.render();
    });


    // Inputs do Usuário:
    // Quit on Escape, q, or Control-C.
    screen.key(['escape', 'q', 'C-c'], function(_ch: any, _key: any) {
        return process.exit(0);
    });

    // Função para lidar com a navegação de foco
    container.key(['tab', 'S-tab'], (ch, key) => {
        const currentFocusedElement = screen.focused;
        text.setContent("Focado: " + currentFocusedElement.content)
    
        if (currentFocusedElement === button1) {
        button2.focus();
        } else if (currentFocusedElement === button2) {
        button1.focus();
        } else {
        button1.focus(); // Definir o foco para o primeiro botão por padrão
        }
    
        screen.render();
    });
  
  // Render the screen.
  screen.render();

}

main(); 