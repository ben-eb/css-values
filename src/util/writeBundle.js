import {rollup} from 'rollup'; // eslint-disable-line
import vinyl from 'rollup-plugin-vinyl';

export default function writeBundle ({entry, dest, external, files}) {
    return rollup({
        entry,
        dest,
        external,
        plugins: [
            vinyl({files}),
        ],
    }).then(bundle => {
        bundle.write({
            format: 'cjs',
            dest,
        });
    });
}
