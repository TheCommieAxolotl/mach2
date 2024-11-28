import { defineConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default defineConfig({
	...viteConfig,
	test: {
		setupFiles: ['./vitest.setup.ts'],
		environment: 'jsdom',
		deps: {
			inline: ['vitest-canvas-mock']
		},
		// For this config, check https://github.com/vitest-dev/vitest/issues/740
		// threads: false,
		environmentOptions: {
			jsdom: {
				resources: 'usable'
			}
		}
	}
});
