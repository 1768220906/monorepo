import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {},
  },
  eslintConfigPrettier,
];
