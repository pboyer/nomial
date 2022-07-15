import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const output = (file, plugins) => ({
    input: 'src/index.ts',
    output: {
        name: 'nomial',
        format: 'umd',
        indent: false,
        file
    },
    plugins
});

export default [
    output('dist/nomial.js', [typescript(), resolve()]),
    output('dist/nomial.min.js', [typescript(), resolve(), terser()])
];