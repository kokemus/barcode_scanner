import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/barcode_scanner_imp.js',
  output: {
    file: 'lib/barcode_scanner.js',
    format: 'iife'
  },
  plugins: [nodeResolve()]
};