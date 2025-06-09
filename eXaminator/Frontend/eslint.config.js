import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
	},
	{
		ignores: ["**/node_modules/", "**/dist/", ".git/"],
	},
	{
		plugins: {
			react,
		},
	},
	{
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	{
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: globals.browser,
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	react.configs.flat.recommended,
	{
		rules: {
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/no-unused-vars": "warn",
		},
	},
];
