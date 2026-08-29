import { defineConfig } from 'tsup';
import { alias } from 'esbuild-plugin-alias';
import path from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  esbuildPlugins: [
    alias({
      '@': path.resolve(__dirname, 'src'),
    }),
  ],
});
