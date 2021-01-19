const { generateCSSModuleName } = require('./config/css/generateCSSModuleName');

module.exports = {
  presets: [
    'react-app'
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    [
      'react-css-modules',
      {
        generateScopedName(name, path) {
          return generateCSSModuleName(name, path);
        },
        autoResolveMultipleImports: true,
        filetypes: {
          '.scss': {
            syntax: 'postcss-scss',
          },
        },
      },
    ],
  ],
};
