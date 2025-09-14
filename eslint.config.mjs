import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});


export default tseslint.config(
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...mantine,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "**/*.{mjs,cjs,js,d.ts,d.mts}"
    ],
  },
);
