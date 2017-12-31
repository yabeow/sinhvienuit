module.exports = {
  extends: 'airbnb',
  rules: {
    'no-use-before-define': ['error', { functions: 0, classes: 0, variables: 0 }],
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
