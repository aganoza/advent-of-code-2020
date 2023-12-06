module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    // https://github.com/typescript-eslint/typescript-eslint/blob/055add01299eb91c87323677038b5f7d08b448d4/packages/eslint-plugin/src/configs/recommended.ts
    "eslint:recommended",
    // https://github.com/typescript-eslint/typescript-eslint/blob/055add01299eb91c87323677038b5f7d08b448d4/packages/eslint-plugin/src/configs/eslint-recommended.ts
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
  ],
  overrides: [
    {
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["jest", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-inferrable-types": "off",
    "prefer-const": "off",
    "jest/no-identical-title": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
};
