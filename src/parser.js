import assign from 'object-assign';
import tokenize from './tokenizer';
import {properties, syntaxes} from './data';

export default class Parser {
    constructor (input) {
        this.input = input;
        this.position = 0;
        this.root = {nodes: []};

        this.current = this.root.nodes;
        this.tokens = tokenize(input);

        return this.loop();
    }

    and () {
        if (this.last) {
            this.last.required = true;
            this.last.order = 'any';
            this.next = {required: true, order: 'any'};
        }
        this.position ++;
    }

    brackets () {
        let last = this.node = {
            type: 'group',
            nodes: []
        };

        let cache = this.current;
        this.current = this.last.nodes;

        let balanced = 1;
        this.position ++;
        while (this.position < this.tokens.length && balanced) {
            if (this.currToken[0] === '[') {
                balanced++;
            }
            if (this.currToken[0] === ']') {
                balanced--;
            }
            if (balanced) {
                this.parse();
            } else {
                this.position ++;
            }
        }
        this.current = cache;
        this.last = last;
    }

    data () {
        if (!this.currToken[1].indexOf('<\'')) {
            let requested = new Parser(properties.filter(p => {
                return p.name === this.currToken[1].slice(2, -2);
            })[0].syntax);
            this.root.nodes = this.root.nodes.concat(requested.nodes);
            this.last = this.root.nodes[this.root.nodes.length - 1];
        } else {
            let range = this.currToken[1].slice(1, -1);
            let requested = syntaxes.filter(s => s.name === range)[0];
            if (requested) {
                this.node = {
                    type: 'group',
                    nodes: new Parser(requested.syntax).nodes
                };
            } else {
                this.node = {
                    type: 'data',
                    value: range,
                    exclusive: true
                };
            }
        }
        this.position ++;
    }

    hash () {
        if (this.last) {
            this.last.repeat = {
                min: 1,
                max: false,
                separator: ','
            };
            this.last.exclusive = false;
        }
        this.position ++;
    }

    multiple () {
        this.last.repeat = {
            min: 1,
            max: false,
            separator: ' '
        };
        this.last.exclusive = false;
        this.position ++;
    }

    optional () {
        if (this.last) {
            this.last.exclusive = false;
            this.last.optional = true;
        }
        this.position ++;
    }

    or () {
        if (!this.last || this.currToken[1] !== '||') {
            return this.unknown();
        }
        this.last.order = 'any';
        this.last.optional = true;
        this.next = {order: 'any', exclusive: false, optional: true};
        this.position ++;
    }

    parentheses () {
        if (!this.last) {
            return this.unknown();
        }
        this.last.nodes = [];
        this.last.type = 'function';

        let cache = this.current;
        this.current = this.last.nodes;

        let balanced = 1;
        this.position ++;
        while (this.position < this.tokens.length && balanced) {
            if (this.currToken[0] === '(') {
                balanced++;
            }
            if (this.currToken[0] === ')') {
                balanced--;
            }
            if (balanced) {
                this.parse();
            } else {
                this.position ++;
            }
        }
        this.current = cache;
    }

    range () {
        if (!this.last) {
            return this.unknown();
        }
        this.last.exclusive = false;
        this.last.repeat = assign(this.last.repeat || {}, this.currToken[1]);
        if (!this.last.repeat.separator) {
            this.last.repeat.separator = ' ';
        }
        this.position ++;
    }

    space () {
        if (!this.nextToken || !this.prevToken) {
            this.position ++;
            return;
        }
        if (
            this.nextToken[1] === '|' &&
            this.tokens[this.position + 2][1] === ' '
        ) {
            this.position += 3;
        } else if (this.prevToken[1] === '[' || this.nextToken[1] === ']') {
            this.position ++;
        } else {
            if (this.last) {
                this.last.exclusive = false;
            }
            this.position ++;
        }
    }

    word () {
        if (
            this.nextToken &&
            this.nextToken[1] === '(' &&
            this.tokens[this.position + 2][1] === ')'
        ) {
            let name = this.currToken[1][0] === '<' ? this.currToken[1].slice(1) : this.currToken[1];
            let func = name + '()';
            let requested = syntaxes.filter(syntax => syntax.name === func);
            if (requested.length) {
                this.node = {
                    type: 'group',
                    exclusive: true,
                    nodes: new Parser(requested[0].syntax).nodes
                };
            } else {
                this.node = {
                    type: 'function',
                    value: name
                };
            }
            // Skips: 1 - word, 2 - (, 3 - ), 4 - >
            this.position += 4;
            return;
        }
        this.node = {
            type: 'keyword',
            value: this.currToken[1],
            exclusive: true
        };
        this.position ++;
    }

    unknown () {
        this.node = {
            type: 'unknown',
            token: this.currToken
        };
        this.position ++;
    }

    parse () {
        switch (this.currToken[0]) {
        case 'data':
            this.data();
            break;
        case 'word':
            this.word();
            break;
        case 'space':
            this.space();
            break;
        case 'multiple':
            this.multiple();
            break;
        case 'hash':
            this.hash();
            break;
        case 'optional':
            this.optional();
            break;
        case 'range':
            this.range();
            break;
        case 'and':
            this.and();
            break;
        case 'or':
            this.or();
            break;
        case '(':
            this.parentheses();
            break;
        case '[':
            this.brackets();
            break;
        default:
            this.unknown();
            break;
        }
    }

    loop () {
        while (this.position < this.tokens.length) {
            this.parse();
        }
        return this.root;
    }

    /**
     * Helper methods
     */

    set node (node) {
        let last = this.last = assign(node, this.next || {});
        this.current.push(last);
        this.next = {};
    }

    get currToken () {
        return this.tokens[this.position];
    }

    get nextToken () {
        return this.tokens[this.position + 1];
    }

    get prevToken () {
        return this.tokens[this.position - 1];
    }
}
