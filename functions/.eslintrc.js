module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    // Actualizamos a 2020 para soportar mejor async/await y sintaxis moderna
    ecmaVersion: 2020, 
  },
  extends: [
    "eslint:recommended",
  ],
  rules: {
    // === REGLAS RELAJADAS PARA EVITAR ERRORES DE DEPLOY ===
    "quotes": "off",              // No importa si usas comillas simples o dobles
    "max-len": "off",             // No importa si las líneas son muy largas
    "indent": "off",              // No importa la identación (espacios vs tabs)
    "no-trailing-spaces": "off",  // Permite espacios al final de las líneas
    "comma-dangle": "off",        // No exige comas al final de objetos
    "arrow-parens": "off",        // No exige paréntesis en arrow functions
    "padded-blocks": "off",       // Permite bloques con o sin relleno
    "valid-jsdoc": "off",         // No exige documentación estricta
    "eol-last": "off",            // No exige línea vacía al final del archivo
    "object-curly-spacing": "off", // Permite espacios dentro de llaves {}
    "no-unused-vars": "warn",     // Solo avisa (amarillo), no detiene el deploy (rojo)
    "no-undef": "error",          // Esto SÍ es error (variables no definidas rompen el código)
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