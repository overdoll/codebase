const config = {
  directives: {
    'default-src': ["'self'"],
    'script-src': ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
    'style-src': [
      "'self'",
      'https://fonts.googleapis.com',
      (req, res) => `'nonce-${res.locals.cspNonce}'`,
    ],
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

export default config;
