const helmet = require('helmet');

const contentSecurityPolicy = require('../config/csp');
const expectCt = require('../config/eCT');

module.exports = helmet({
  contentSecurityPolicy,
  expectCt,
  hsts: false,
});
