import globals from 'globals'

export default [
  { ignores: ['node_modules/**'] },
  {
    files: ['assets/js/**/*.js', 'projetos-*/**/*.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.browser },
    rules: { 'no-unused-vars': 'error', 'no-undef': 'error', 'no-eval': 'error' },
  },
  {
    files: ['scripts/**/*.mjs', 'tests/**/*.mjs', 'eslint.config.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.node },
    rules: { 'no-unused-vars': 'error', 'no-undef': 'error' },
  },
]
