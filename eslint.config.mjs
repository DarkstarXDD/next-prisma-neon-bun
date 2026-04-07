import nextVitals from "eslint-config-next/core-web-vitals"
import perfectionist from "eslint-plugin-perfectionist"
import nextTs from "eslint-config-next/typescript"
import { includeIgnoreFile } from "@eslint/compat"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"
import { fileURLToPath } from "url"

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url))

export default defineConfig(
  nextVitals,
  nextTs,
  tseslint.configs.strictTypeChecked, // https://typescript-eslint.io/users/configs/#strict-type-checked
  perfectionist.configs["recommended-line-length"], //  https://perfectionist.dev/configs/recommended-line-length.html
  {
    rules: {
      "react-hooks/incompatible-library": "off",
      "import/no-duplicates": "error",
      "import/first": "error",
      "perfectionist/sort-modules": "off",
      "perfectionist/sort-objects": "off",
      "perfectionist/sort-interfaces": "off",
      "perfectionist/sort-object-types": "off",
    },
    // For type-aware linting with the strictTypeChecked config: https://typescript-eslint.io/getting-started/typed-linting/
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  includeIgnoreFile(gitignorePath)
)
