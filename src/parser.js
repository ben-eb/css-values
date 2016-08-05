import tokenize from './tokenizer';
import * as t from './types';

export default class Parser {
    constructor (input) {
        this.input = input;
        this.pos = 0;
        this.tokens = tokenize(input);
        this.candidates = [];
        this.groups = [];

        this.current = this.candidates;

        return this.loop();
    }

    /**
     * Token iteration methods
     */

    loop () {
        while (this.pos < this.tokens.length) {
            this.parse();
        }

        return this.candidates;
    }

    parse () {
        switch (this.tokens[this.pos][0]) {
        case '(':
            this.functionStart();
            break;
        case ')':
            this.functionEnd();
            break;
        case t.and:
            this.and();
            break;
        case t.closeSquareBracket:
            this.groupEnd();
            break;
        case t.data:
            this.data();
            break;
        case t.hash:
            this.hash();
            break;
        case t.multiple:
            this.multiple();
            break;
        case t.openSquareBracket:
            this.groupStart();
            break;
        case t.optional:
            this.optional();
            break;
        case t.or:
            this.or();
            break;
        case t.property:
            this.property();
            break;
        case t.range:
            this.range();
            break;
        case t.space:
            this.space();
            break;
        case t.word:
            this.word();
            break;
        }
    }

    /**
     * Token type handlers
     */

    and () {
        if (!this.last.optional) {
            this.last.optional = false;
        }
        this.next = {optional: false};
        if (!this.parent) {
            this.wrapper = {
                type: 'group',
                order: 'any',
                min: 1,
            };
        } else {
            this.parent.order = 'any';
            this.parent.min = 1;
        }
        this.parent.max = this.parent.values.length + 1;
        this.pos ++;
    }

    data () {
        this.node = {
            type: 'data',
            value: this.tokens[this.pos][1],
        };
        this.pos ++;
    }

    functionStart () {
        const group = this.last;
        group.type = 'function';
        group.values = [];

        this.groups.push({
            group,
            cache: this.current,
        });

        this.current = group.values;
        this.parent = group;
        this.pos ++;
    }

    functionEnd () {
        const {cache} = this.groups.pop();

        this.current = cache;
        this.parent = null;
        this.pos ++;
    }

    groupEnd () {
        const {cache, group} = this.groups.pop();

        this.current = cache;
        this.node = group;
        this.parent = null;
        this.pos ++;
    }

    groupStart () {
        const group = {
            type: 'group',
            values: [],
            ...this.next,
        };

        this.next = {};

        this.groups.push({
            group,
            cache: this.current,
        });

        this.current = group.values;
        this.parent = group;
        this.pos ++;
    }

    hash () {
        this.current[this.lastIndex] = {
            ...this.last,
            separator: ',',
            min: 1,
            max: false,
        };
        this.pos ++;
    }

    multiple () {
        this.current[this.lastIndex] = {
            ...this.last,
            separator: ' ',
            min: 1,
            max: false,
        };
        this.pos ++;
    }

    optional () {
        if (this.tokens[this.pos][1] === '*') {
            this.last.min = 0;
            this.last.max = false;
        }
        this.last.optional = true;
        this.pos ++;
    }

    or () {
        const type = this.tokens[this.pos][1];
        if (type === '|') {
            this.pos ++;
        } else {
            this.last.optional = true;
            this.next = {optional: true};
            if (!this.parent) {
                this.wrapper = {
                    type: 'group',
                    order: 'any',
                    min: 1,
                };
            } else {
                this.parent.order = 'any';
                this.parent.min = 1;
            }
            this.parent.max = this.parent.values.length + 1;
            this.pos ++;
        }
    }

    property () {
        this.node = {
            type: 'property',
            value: this.tokens[this.pos][1],
        };
        this.pos ++;
    }

    range () {
        this.current[this.lastIndex] = {
            ...this.last,
            separator: ' ',
            ...this.tokens[this.pos][1],
        };
        this.pos ++;
    }

    space () {
        const {p1, n1} = this;
        // These spaces are insignificant
        if (
            (p1 && p1[0] === t.openSquareBracket) ||
            (n1 && n1[0] === t.closeSquareBracket) ||
            (p1 && p1[0] === t.and) ||
            (n1 && n1[0] === t.and) ||
            (p1 && p1[0] === t.or) ||
            (n1 && n1[0] === t.or)
        ) {
            this.pos ++;
            return;
        }
        // However in this case the space signifies 'precedence'
        this.last.optional = false;
        this.next = {
            ...this.next,
            optional: false,
        };
        if (!this.parent) {
            this.wrapper = {
                type: 'group',
                order: 'defined',
            };
        } else {
            this.parent.order = 'defined';
        }
        this.pos ++;
    }

    word () {
        this.node = {
            type: 'keyword',
            value: this.tokens[this.pos][1],
        };
        this.pos ++;
    }

    /**
     * Helper methods
     */

    get p1 () {
        return this.tokens[this.pos - 1];
    }

    get n1 () {
        return this.tokens[this.pos + 1];
    }

    set node (node) {
        const last = this.last = {
            ...node,
            ...this.next,
        };
        this.current.push(last);
        this.lastIndex = this.current.indexOf(last);
        this.next = {};
    }

    set wrapper (node) {
        const wrapper = this.current[this.lastIndex] = node;
        wrapper.values = [this.last];
        this.current = wrapper.values;
        this.parent = wrapper;
    }
}
