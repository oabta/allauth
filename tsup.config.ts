import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/react/index.ts', 'src/browser/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  outDir: 'build',
});
