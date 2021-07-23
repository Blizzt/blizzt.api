module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'rules': {
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', {'before': false, 'after': true}],
    'eol-last': ['error', 'always'],
    'indent': ['error', 2, {'MemberExpression': 1, 'SwitchCase': 1}],
    'no-multiple-empty-lines': ['error'],
    'no-new-symbol': 'error',
    'no-trailing-spaces': ['error'],
    'no-undef': 'off',
    'no-unused-vars': ['error'],
    'object-shorthand': 'error',
    'prefer-const': 2,
    'quotes': ['error', 'single'],
    'space-in-parens': ['error', 'never'],
    'strict': [2, 'never'],
    'no-mixed-spaces-and-tabs': 'off',
    'object-curly-spacing': ['error', 'never', {'arraysInObjects': true}],
  },
}
