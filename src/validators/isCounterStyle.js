import {walk} from 'postcss-value-parser';
import isCustomIdent from './isCustomIdent';
import isFunction from './isFunction';
import isImage from './isImage';
import isKeyword from './isKeyword';
import isSpace from './isSpace';
import isString from './isString';

const standard = [
    'disc',
    'circle',
    'square',
    'decimal',
    'cjk-decimal',
    'decimal-leading-zero',
    'lower-roman',
    'upper-roman',
    'lower-greek',
    'lower-alpha',
    'lower-latin',
    'upper-alpha',
    'upper-latin',
    'arabic-indic',
    '-moz-arabic-indic',
    'armenian',
    'bengali',
    '-moz-bengali',
    'cambodian',
    'cjk-earthly-branch',
    '-moz-cjk-earthly-branch',
    'cjk-heavenly-stem',
    '-moz-cjk-heavenly-stem',
    'cjk-ideographic',
    'devanagari',
    '-moz-devanagari',
    'ethiopic-numeric',
    'georgian',
    'gujarati',
    '-moz-gujarati',
    'gurmukhi',
    '-moz-gurmukhi',
    'hebrew',
    'hiragana',
    'hiragana-iroha',
    'japanese-formal',
    'japanese-informal',
    'kannada',
    '-moz-kannada',
    'katakana',
    'katakana-iroha',
    'khmer',
    '-moz-khmer',
    'korean-hangul-formal',
    'korean-hanja-formal',
    'korean-hanja-informal',
    'lao',
    '-moz-lao',
    'lower-armenian',
    'malayalam',
    '-moz-malayalam',
    'mongolian',
    'myanmar',
    '-moz-myanmar',
    'oriya',
    '-moz-oriya',
    'persian',
    '-moz-persian',
    'simp-chinese-formal',
    'simp-chinese-informal',
    'tamil',
    '-moz-tamil',
    'telugu',
    '-moz-telugu',
    'thai',
    '-moz-thai',
    'tibetan',
    'trad-chinese-formal',
    'trad-chinese-informal',
    'upper-armenian',
    'disclosure-open',
    'disclosure-closed',
];

const nonStandard = [
    '-moz-ethiopic-halehame',
    '-moz-ethiopic-halehame-am',
    'ethiopic-halehame-ti-er',
    '-moz-ethiopic-halehame-ti-er',
    'ethiopic-halehame-ti-et',
    '-moz-ethiopic-halehame-ti-et',
    'hangul',
    '-moz-hangul',
    'hangul-consonant',
    '-moz-hangul-consonant',
    'urdu',
    '-moz-urdu',
];

export const valid = [
    ...standard,
    ...nonStandard,
];

export const symbolTypes = [
    'cyclic',
    'numeric',
    'alphabetic',
    'symbolic',
    'fixed',
];

function isSymbols (node) {
    if (!isFunction(node, 'symbols')) {
        return false;
    }
    let validSym = true;
    walk(node.nodes, (child, index) => {
        const even = index % 2 === 0;
        if (
            even && (
                (index === 0 && !isKeyword(child, symbolTypes) && !isString(child) && !isImage(child)) ||
                (index > 1 && !isString(child) && !isImage(child))
            ) || !even && !isSpace(child)
        ) {
            validSym = false;
        }
        return false;
    });
    return validSym;
}

export default function isCounterStyle (node) {
    return isCustomIdent(node) || isKeyword(node, valid) || isSymbols(node);
}
