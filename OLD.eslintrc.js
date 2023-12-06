module.exports = {
  root: true,
  overrides: [
    {
      env: {
        node: true,
        "jest/globals": true,
      },
      files: ["**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      plugins: ["jest", "@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        // https://github.com/typescript-eslint/typescript-eslint/blob/055add01299eb91c87323677038b5f7d08b448d4/packages/eslint-plugin/src/configs/eslint-recommended.ts
        // https://github.com/typescript-eslint/typescript-eslint/blob/055add01299eb91c87323677038b5f7d08b448d4/packages/eslint-plugin/src/configs/recommended.ts
        "plugin:jest/recommended",
      ],
    },
  ],
  rules: {
    "@typescript-eslint/no-inferrable-types": "off",
    "prefer-const": "off",
    "jest/no-identical-title": "off",
  },
};
