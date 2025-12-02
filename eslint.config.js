// eslint.config.js
import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintImportPlugin from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettier from "eslint-plugin-prettier";

// 文件忽略
const ignores = ["**/node_modules/**", "**/dist/**", ".*", "scripts/**", "**/.d.ts"];

export default defineConfig([
  {
    // ==========================
    // 通用配置（所有环境都适用）
    // ==========================
    ignores,
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
    plugins: {
      prettier: eslintPluginPrettier,
      import: eslintImportPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
    },
    rules: {
      "no-var": "error",
    },
  },

  {
    // ==========================
    // 前台（Web/React）配置
    // ==========================
    ignores,
    files: [
      "apps/web/**/*.{js,ts,jsx,tsx}",
      "apps/admin/**/*.{js,ts,jsx,tsx}",
      "packages/components/**/*.{js,ts,jsx,tsx}",
    ],
    extends: [eslintConfigPrettier],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {},
  },

  {
    // ==========================
    // 后台（Node）配置
    // ==========================
    ignores,
    files: ["apps/server/**/*.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {},
  },
]);
