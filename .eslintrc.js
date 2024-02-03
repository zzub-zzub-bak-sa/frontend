module.exports = {
  root: true,
  extends: ['airbnb', '@react-native', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'operator-linebreak': ['error', 'before'],
    'react/function-component-definition': 'off',
    'global-require': 'off',
    'import/no-unresolved': 'off',
    'no-return-assign': 'off',
  },
};
