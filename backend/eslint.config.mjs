import globals from "globals";
import tseslint from "typescript-eslint";


export default [
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,

  {
    rules: {
        "no-unused-vars": "warn",
        "no-undef": "warn"
    }
}
];