import {rollup} from 'rollup'; // eslint-disable-line
import babel from 'rollup-plugin-babel';
import vinyl from 'rollup-plugin-vinyl';

export default function writeBundle ({entry, dest, external, files}) {
    return rollup({
        entry,
        dest,
        external,
        plugins: [
            vinyl({files}),
            babel({
                babelrc: false,
                presets: [
                    'es2015-rollup',
                ],
            }),
        ],
    }).then(bundle => {
        bundle.write({
            format: 'es',
            dest,
        });
    });
}
