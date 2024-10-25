import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        // Agrega Node.js globals aquí
        require: 'readonly',
        process: 'readonly',
      },
    },
    settings: {
      node: {
        allowModules: true,
        tryExtensions: ['.js', '.json', '.node'],
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error'],
    },
  },
  pluginJs.configs.recommended,
  {
    files: ['**/*.js'],
    rules: {
      'prettier/prettier': ['error'],
    },
  },
  {
    // Especificar reglas solo para archivos de test
    files: ['**/__tests__/**', '**/tests/**'],
    rules: {
      'prettier/prettier': 'off', // Desactiva Prettier en tests
      'no-unused-expressions': 'off', // Permitir chai en tests (si usas chai)
    },
  },
];
