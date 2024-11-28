import { defineConfig } from 'vite';
import tsconfig from 'vite-plugin-tsconfig-paths';

import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
	root: path.resolve(__dirname, ''),
	plugins: [
		tsconfig({
			tsConfigPath: path.resolve(__dirname, '../tsconfig.json')
		})
	]
});
