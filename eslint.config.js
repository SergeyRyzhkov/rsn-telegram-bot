import typescriptEslint from "@typescript-eslint/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    plugins: {
      ts: typescriptEslint,
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
  eslintConfigPrettier,
];
