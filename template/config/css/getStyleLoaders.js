const path = require('path');

// common function to get style loaders
exports.getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: true,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: true,
          root: path.resolve('src'),
        },
      }
    )
    if (typeof preProcessor === 'string') {
      loaders.push({
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      );
    } else {
      loaders.push(preProcessor)
    }
  }
  return loaders;
};
