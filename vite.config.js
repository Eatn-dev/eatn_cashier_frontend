import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./tests/setup.js",

		coverage: {
			provider: "istanbul",
			reporter: ["text", "html", "json", "lcov"]
		}
	}
};

export default config;
