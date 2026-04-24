import { defineConfig } from "eslint/config";
import baseConfig from "@monorepo/config/eslint/base";
import reactConfig from "@monorepo/config/eslint/react";
import nodeConfig from "@monorepo/config/eslint/node";

const ignores = [
  "**/node_modules/**",
  "**/dist/**",
  "**/.turbo/**",
  ".*",
  "scripts/**",
  "**/.d.ts",
];

export default defineConfig([
  {
    ignores,
    extends: baseConfig,
  },
  {
    ignores,
    files: [
      "apps/web/**/*.{js,ts,jsx,tsx}",
      "apps/admin/**/*.{js,ts,jsx,tsx}",
      "packages/components/**/*.{js,ts,jsx,tsx}",
    ],
    extends: reactConfig,
  },
  {
    ignores,
    files: ["apps/server/**/*.{js,ts}"],
    extends: nodeConfig,
  },
]);
