module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
  ],
  rules: {
    // Desactivar reglas estrictas
    "quotes": "off",
    "max-len": "off",
    "indent": "off",
    "no-trailing-spaces": "off",
    "comma-dangle": "off",
    "arrow-parens": "off",
    "padded-blocks": "off",
    "valid-jsdoc": "off",
    "eol-last": "off",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
};