module.exports = {
  root: true,
  extends: ['@react-native-community'],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        semi: 'off',
      },
    },
  ],
}
