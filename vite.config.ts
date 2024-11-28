import terser from '@rollup/plugin-terser';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfig from 'vite-plugin-tsconfig-paths';

import { builtinModules } from 'node:module';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const IS_DEV = process.env.npm_lifecycle_event === 'dev';

export default defineConfig({
	build: {
		target: 'esnext',
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			formats: ['es', 'cjs']
		},
		outDir: 'dist',
		rollupOptions: {
			external: builtinModules.concat(builtinModules.map((m) => `node:${m}`)).concat('katex'),
			plugins: [!IS_DEV && terser({})].filter(Boolean)
		}
	},
	plugins: [
		dts({
			exclude: ['test/**/*', 'demo/**/*'],
			rollupTypes: true
		}),
		tsconfig(),
		terser()
	]
});
