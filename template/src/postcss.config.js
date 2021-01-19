module.exports = function (context) {
  const plugins = [
    require('autoprefixer'),
  ];

  return {
    from: context.from,
    plugins,
    to: context.to,
  };
};
