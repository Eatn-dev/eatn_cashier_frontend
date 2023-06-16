module.exports = {
	root: true,
	extends: ['eslint:recommended'],
	plugins: ['svelte', 'testing-library', 'jest-dom'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
