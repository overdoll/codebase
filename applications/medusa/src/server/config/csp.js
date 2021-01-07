const config = {
  directives: {
    'default-src': ["'self'"],
    'script-src': ["'self'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'font-src': ['data:', '*'],
    'base-uri': ["'self'"],
    'object-src': ["'none'"],
    'connect-src': ["'self'"],
    'frame-src': [],
    'frame-ancestors': ["'none'"],
    'report-uri': [],
    'form-action': ["'self'"],
    'img-src': ['blob:', 'data:', '*'],
    'media-src': ['data:', '*'],
    upgradeInsecureRequests: [],
  },
};

config.directives['script-src'].push("'unsafe-eval'");
config.directives['style-src'].push("'unsafe-eval'");

module.exports = config;
