import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import '@shikijs/vitepress-twoslash/style.css';
import 'katex/dist/katex.min.css';
import type { EnhanceAppContext } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import './custom.css';

export default {
	extends: DefaultTheme,
	enhanceApp({ app }: EnhanceAppContext) {
		app.use(TwoslashFloatingVue);
	}
};
