import style from "@isentinel/eslint-config";

export default style({
	formatters: {
		lua: false,
	},
	rules: {
		"id-length": "off",
		"import/no-namespace": "off",
		"jsdoc/informative-docs": "off",
		"shopify/prefer-class-properties": "off",
		"unicorn/filename-case": "off",
	},
	typescript: {
		parserOptions: {
			project: "tsconfig.build.json",
		},
		tsconfigPath: "tsconfig.build.json",
	},
});
