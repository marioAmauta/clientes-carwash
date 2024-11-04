import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import importHelpers from "eslint-plugin-import-helpers";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tsEslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all
});

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...compat.extends("next", "next/core-web-vitals"),
  {
    plugins: {
      "import-helpers": importHelpers
    },
    rules: {
      "import-helpers/order-imports": [
        "error",
        {
          newlinesBetween: "always",
          groups: [
            ["/^next/", "module"],
            "/^@/styles/",
            "/^@/data-access/",
            "/^@/lib/",
            "/^@/app/",
            "/^@/providers/",
            "/^@/hooks/",
            "/^@/components/",
            ["parent", "sibling", "index"]
          ],
          alphabetize: {
            order: "asc",
            ignoreCase: true
          }
        }
      ],
      "@typescript-eslint/no-empty-object-type": "off",
      "no-console": "warn"
    }
  },
  eslintPluginPrettierRecommended
);
