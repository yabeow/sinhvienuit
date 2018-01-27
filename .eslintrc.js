module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/prefer-stateless-function': 0,
    'react/forbid-prop-types': 0,
  },
};
