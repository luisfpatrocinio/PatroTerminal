"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blessed_1 = __importDefault(require("blessed"));
const page_1 = require("./classes/page");
const colors = {
    green: [
        '#0d323b',
        '#114d44',
        '#127a3e',
        '#5ab03f',
        '#b5d96c'
    ]
};
function main() {
    const myPages = [
        new page_1.Page('PatroHome', 'Página inicial do PatroTerminal.'),
        new page_1.Page('PatroConfig', 'Configurações do PatroTerminal.'),
        new page_1.Page('PatroHelp', 'Ajuda do PatroTerminal.')
    ];
    // Cria uma tela: container para todos os elementos da interface.
    var screen = blessed_1.default.screen({
        smartCSR: true,
        title: 'PatroTerminal'
    });
    // Cria uma caixa de texto.
    const text = blessed_1.default.text({
        top: 'top',
        left: 'center',
        content: 'Bem-vindo ao PatroTerminal!',
        tags: true,
        style: {
            fg: colors.green[4], // Cor do texto (branco)
        }
    });
    // Cria uma box:
    const container = blessed_1.default.box({
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
        tags: true,
        content: 'Conteúdo da caixa'
    });
    // Crie um botão
    const button1 = blessed_1.default.button({
        parent: container,
        bottom: 1,
        left: 'center',
        content: 'Clique aqui!',
        style: {
            fg: 'black',
            bg: 'white',
            focus: {
                fg: 'white',
                bg: 'blue' // Cor de fundo do botão quando em foco (azul)
            }
        },
        align: 'center',
        width: 15,
        height: 3,
        border: {
            type: 'line' // Tipo de borda do botão (linha)
        }
    });
    // Crie outro botão
    const button2 = blessed_1.default.button({
        parent: container,
        bottom: 6,
        left: 'center',
        content: 'Clique aaa!',
        style: {
            fg: 'black',
            bg: 'white',
            focus: {
                fg: 'white',
                bg: 'blue' // Cor de fundo do botão quando em foco (azul)
            }
        },
        align: 'center',
        width: 15,
        height: 3,
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
    screen.key(['escape', 'q', 'C-c'], function (_ch, _key) {
        return process.exit(0);
    });
    // Função para lidar com a navegação de foco
    container.key(['tab', 'S-tab'], (ch, key) => {
        const currentFocusedElement = screen.focused;
        text.setContent("Focado: " + currentFocusedElement.content);
        if (currentFocusedElement === button1) {
            button2.focus();
        }
        else if (currentFocusedElement === button2) {
            button1.focus();
        }
        else {
            button1.focus(); // Definir o foco para o primeiro botão por padrão
        }
        screen.render();
    });
    // Render the screen.
    screen.render();
}
main();
