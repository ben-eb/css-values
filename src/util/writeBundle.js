import {rollup} from 'rollup';
import babel from 'rollup-plugin-babel';
import vinyl from 'rollup-plugin-vinyl';

function shouldPrintComment (comment) {
    return !~comment.indexOf('eslint-');
}

export default function writeBundle ({entry, dest, external, files}) {
    return rollup({
        entry,
        dest,
        external,
        plugins: [
            vinyl({files}),
            babel({
                babelrc: false,
                compact: false,
                presets: [
                    'es2015-rollup',
                ],
                shouldPrintComment,
            }),
        ],
    }).then(bundle => {
        bundle.write({
            format: 'es',
            dest,
        });
    });
}
