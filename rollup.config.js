import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/barcode_scanner_imp.js',
  output: {
    file: 'lib/barcode_scanner.js',
    format: 'iife'
  },
  plugins: [nodeResolve(), terser()]
};