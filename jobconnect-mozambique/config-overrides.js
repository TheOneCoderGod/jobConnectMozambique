const { override, disableEsLint } = require('customize-cra');

module.exports = override(
  // Disable the default service worker and ESLint
  disableEsLint()
);
