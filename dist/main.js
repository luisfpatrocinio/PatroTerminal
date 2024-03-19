"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blessed_1 = __importDefault(require("blessed"));
function main() {
    // Create a screen object.
    var screen = blessed_1.default.screen({
        smartCSR: true
    });
    screen.title = 'PatroTerminal';
    // Create a box perfectly centered horizontally and vertically.
    var box = blessed_1.default.box({
        top: 'center',
        left: 'center',
        width: '50%',
        height: '50%',
        content: 'Hello {bold}world{/bold}!',
        tags: true,
        border: {
            type: 'line'
        },
        style: {
            fg: 'white',
            bg: 'magenta',
            border: {
                fg: '#f0f0f0'
            },
            hover: {
                bg: 'green'
            }
        }
    });
    // Append our box to the screen.
    screen.append(box);
    // If our box is clicked, change the content.
    box.on('click', function (_data) {
        box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
        screen.render();
    });
    // If box is focused, handle `enter`/`return` and give us some more content.
    box.key('enter', function (_ch, _key) {
        box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
        box.setLine(1, 'bar');
        box.insertLine(1, 'foo');
        screen.render();
    });
    // Quit on Escape, q, or Control-C.
    screen.key(['escape', 'q', 'C-c'], function (_ch, _key) {
        return process.exit(0);
    });
    // Focus our element.
    box.focus();
    // Render the screen.
    screen.render();
}
main();
