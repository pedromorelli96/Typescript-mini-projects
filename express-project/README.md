# 1. Initialize the TypeScript Environment

To get started, install TypeScript as a development dependency:

```sh
npm i -D typescript ts-node
```

Next, initialize the TypeScript configuration file:

```sh
npx tsc --init
```

This will create a `tsconfig.json` file that you need to configure. Open the file and replace its content with the following:

```json
{
  "compilerOptions": {
    "target": "ES2016",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["./src/**/*.ts", ".eslintrc.cjs"]
}
```

# 2. Install the Dependencies

To install the required dependencies, run the following commands:

```sh
npm i express zod cors

npm i -D @types/express @types/node @types/cors prettier nodemon eslint
```

# 3. Add the Scripts in the `package.json`

Add the following scripts to the `scripts` property in your `package.json` file:

```json
{
  "scripts": {
    "dev": "nodemon src/main.ts --ext ts",
    "prettier": "prettier --write ."
  }
}
```

# 4. Add `.prettierrc` Configuration File

Create a `.prettierrc` file in your project with the following configuration:

```json
{
  "printWidth": 100,
  "bracketSameLine": true,
  "jsxSingleQuote": false,
  "arrowParens": "always",
  "bracketSpacing": true,
  "trailingComma": "es5",
  "semi": true,
  "singleQuote": false
}
```

# 5. Create the `main.ts` File

Create a `main.ts` file under the `src` directory with the following content:

```ts
import express, { type Request, type Response, type Application } from "express";

const app: Application = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

# 6. Configure ESLint

Install the following development dependencies:

```sh
npm i -D @typescript-eslint/eslint-plugin eslint-plugin-prettier@latest
```

Create a `.eslintrc.cjs` file with the following configuration:

```js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      files: ["*.ts"],
      extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        vars: "all",
        args: "all",
        varsIgnorePattern: "^_",
      },
    ],
    "no-unused-vars": "off",
    "no-dupe-else-if": "error",
    "no-dupe-keys": "error",
    "no-duplicate-imports": "error",
    "no-unreachable": "error",
    "no-use-before-define": "error",
    "dot-notation": "error",
    eqeqeq: "error",
    "no-lonely-if": "error",
    "no-return-await": "error",
    "no-useless-catch": "error",
    "no-var": "error",
    "prefer-const": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    "@typescript-eslint/no-empty-interface": "error",
    "consistent-return": "error",
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    "object-shorthand": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "no-implicit-coercion": "error",
    "@typescript-eslint/return-await": "error",
    "no-unneeded-ternary": "error",
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/no-meaningless-void-operator": "warn",
    "no-plusplus": [
      "error",
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "no-shadow": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "explicit",
        overrides: {
          accessors: "off",
          constructors: "no-public",
          methods: "explicit",
          properties: "explicit",
          parameterProperties: "explicit",
        },
      },
    ],
    "@typescript-eslint/consistent-type-exports": [
      "error",
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
    "@typescript-eslint/consistent-generic-constructors": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "no-self-compare": "error",
  },
};

module.exports = config;
```
