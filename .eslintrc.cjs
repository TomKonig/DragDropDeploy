/* Root ESLint config */
module.exports = {
  root: true,
  ignorePatterns: ["dist", "*.tsbuildinfo", "docs/.generated", "**/*.d.ts", "**/*config.ts", "**/jest*.ts", "frontend/vitest.setup.ts", "backend/scripts/**"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: [
      "./tsconfig.json",
      "./backend/tsconfig.json",
      "./backend/tsconfig.build.json",
      "./frontend/tsconfig.json",
      "./shared/tsconfig.json"
    ],
    tsconfigRootDir: __dirname,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  settings: {
    // Ensure import plugin resolves TS path aliases across workspaces
    'import/resolver': {
      typescript: {
        // Root tsconfig plus per-package configs for accurate path + type info
        project: [
          './tsconfig.json',
          './backend/tsconfig.json',
          './backend/tsconfig.build.json',
          './frontend/tsconfig.json',
          './shared/tsconfig.json'
        ],
        alwaysTryTypes: true
      }
    }
  },
  rules: {
    "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/order": ["warn", { "alphabetize": { order: "asc", caseInsensitive: true }, "newlines-between": "always" }],
    "no-console": ["warn", { allow: ["warn", "error"] }]
  },
  overrides: [
    {
      files: [
        "**/__tests__/**",
        "**/*.spec.ts",
        "**/*.e2e-spec.ts",
        "**/vitest.setup.ts",
        "**/vite.config.ts",
        "**/vitest.config.ts",
        "**/jest*.ts",
        "**/scripts/**"
      ],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/require-await": "off"
      }
    }
  ]
};
