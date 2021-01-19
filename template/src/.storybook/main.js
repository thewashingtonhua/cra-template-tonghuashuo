const { getStyleLoaders } = require('../../config/css/getStyleLoaders')
const { generateCSSModuleName } = require('../../config/css/generateCSSModuleName')

module.exports = {
  "stories": [
    "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "addons": [
    "@storybook/addon-actions",
    "@storybook/addon-essentials",
    "@storybook/addon-links",
  ],
  babel: async (options) => ({
    ...options,
    // enable this if in mono-repo
    // rootMode: 'upward',
  }),
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      exclude: /\.module\.scss$/,
      use: getStyleLoaders(
        {
          importLoaders: 3,
          sourceMap: true
        },
        'sass-loader'
      ),
      sideEffects: true
    });
    config.module.rules.push({
      test: /\.module\.scss$/,
      use: getStyleLoaders(
        {
          importLoaders: 3,
          sourceMap: true,
          modules: {
            getLocalIdent({ resourcePath }, _, localName) {
              return generateCSSModuleName(localName, resourcePath);
            },
          }
        },
        'sass-loader'
      ),
    });

    // Return the altered config
    return config;
  },
}
