const genericNames = require('generic-names');

exports.generateCSSModuleName = genericNames('[local]--[hash:base64:5]', {
  context: process.cwd(),
});
