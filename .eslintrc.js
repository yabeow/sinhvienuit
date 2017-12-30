module.exports = {
  extends: 'airbnb',
  rules: {
    'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/prefer-stateless-function': false,
    'react/forbid-prop-types': false,
  },
};
