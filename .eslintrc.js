module.exports = {
  extends: [
    'eslint:recommended',
    'taro/react',
  ],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-loss-of-precision':'off',
    'no-nonoctal-decimal-escape': 'off',
    'no-unsafe-optional-chaining': 'off',
    'no-useless-backreference': 'off',
    'semi': 'error',
    'quote-props': ['error', 'consistent-as-needed'],
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'object-curly-spacing': ['error', 'always'],
    'react-hooks/exhaustive-deps': 'off',
    'no-shadow': 'off',
    "indent": ["error", 2],
    "comma-spacing": ["error", { "before": false, "after": true }],
    'no-return-assign': 'off',
    'no-undefined': 'off',
    // 回调层数
    'max-nested-callbacks': ['error', 5],
    'no-implicit-coercion': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-throw-literal': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-shadow': 'off'
  },
};
