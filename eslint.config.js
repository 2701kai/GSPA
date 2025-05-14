import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintImportPlugin from "eslint-plugin-import";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: eslintImportPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // "import/no-unresolved": "error",
      // tailwind/vite error annoying, so inhibited by
      "import/no-unresolved": ["error", { ignore: ["^@tailwindcss/vite$"] }],
      "import/no-extraneous-dependencies": "warn",
      "import/no-mutable-exports": "warn",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
        },
      ],
      // "import/no-case-sensitive-paths": "error",
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"],
          moduleDirectory: ["node_modules", "."],
        },
      },
    },
  },
];
