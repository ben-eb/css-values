import toDecimal from './util/toDecimal';

const PIPE              = '|'.charCodeAt(0);
const SPACE             = ' '.charCodeAt(0);
const FEED              = '\f'.charCodeAt(0);
const TAB               = '\t'.charCodeAt(0);
const CR                = '\r'.charCodeAt(0);
const PLUS              = '+'.charCodeAt(0);
const HASH              = '#'.charCodeAt(0);
const ASTERISK          = '*'.charCodeAt(0);
const AMPERSAND         = '&'.charCodeAt(0);
const QUESTION_MARK     = '?'.charCodeAt(0);
const OPEN_SQUARE       = '['.charCodeAt(0);
const CLOSE_SQUARE      = ']'.charCodeAt(0);
const OPEN_CURLY        = '{'.charCodeAt(0);
const OPEN_PARENTHESES  = '('.charCodeAt(0);
const CLOSE_PARENTHESES = ')'.charCodeAt(0);

const RE_WORD_END       = /[ \n\t\r\(\)\{\}?:;&#\+\|~,\[\]\\]|\/(?=\*)/g;

export default function tokenize (input) {
    let pos = 0;
    let len = input.length;
    let code, next, content;
    let tokens = [];

    while (pos < len) {
        code = input.charCodeAt(pos);

        switch (code) {
        case PLUS:
            tokens.push(['multiple', '+']);
            break;
        case AMPERSAND:
            next = pos;
            do {
                next += 1;
                code = input.charCodeAt(next);
            } while (code === AMPERSAND);

            tokens.push(['and', input.slice(pos, next)]);
            pos = next - 1;
            break;
        case PIPE:
            next = pos;
            do {
                next += 1;
                code = input.charCodeAt(next);
            } while (code === PIPE);

            tokens.push(['or', input.slice(pos, next)]);
            pos = next - 1;
            break;
        case OPEN_CURLY:
            next = input.indexOf('}', pos + 1);
            const [min, max] = input.slice(pos + 1, next).split(',').map(toDecimal);
            tokens.push(['range', {min, max}]);
            pos = next + 1;
            break;
        case OPEN_PARENTHESES:
            tokens.push(['(', '(']);
            break;
        case CLOSE_PARENTHESES:
            tokens.push([')', ')']);
            break;
        case OPEN_SQUARE:
            tokens.push(['[', '[']);
            break;
        case CLOSE_SQUARE:
            tokens.push([']', ']']);
            break;
        case HASH:
            tokens.push(['hash', '#']);
            break;
        case ASTERISK:
            tokens.push(['optional', '*']);
            break;
        case QUESTION_MARK:
            tokens.push(['optional', '?']);
            break;
        case SPACE:
        case TAB:
        case CR:
        case FEED:
            next = pos;
            do {
                next += 1;
                code = input.charCodeAt(next);
            } while (
                code === SPACE ||
                code === TAB   ||
                code === CR    ||
                code === FEED
            );

            tokens.push(['space', input.slice(pos, next)]);
            pos = next - 1;
            break;
        default:
            RE_WORD_END.lastIndex = pos + 1;
            RE_WORD_END.test(input);
            if ( RE_WORD_END.lastIndex === 0 ) {
                next = len - 1;
            } else {
                next = RE_WORD_END.lastIndex - 2;
            }

            let name = 'word';
            content = input.slice(pos, next + 1);

            if (input[pos] === '<' && input[next] === '>') {
                name = 'data';
                content = content.slice(1, -1);
                // Translate curly quotes to straight quotes
                content = content.replace(/[\u2018\u2019]/g, "'");
                if (content[0] === "'" && content[content.length - 1] === "'") {
                    name = 'property';
                    content = content.slice(1, -1);
                }
            }

            tokens.push([name, content]);
            pos = next;
            break;
        }

        pos ++;
    }

    return tokens;
}
