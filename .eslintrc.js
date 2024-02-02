module.exports = {
  root: true,
  extends: ['airbnb', '@react-native', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'operator-linebreak': ['error', 'before'],
    'global-require': 'off',
    'react/function-component-definition': 'off',
  },
};
