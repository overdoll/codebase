const config = {
  directives: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      // TODO: remove unsafe-inline if in production, this is required for react-error-overlay
      "'unsafe-inline'",
      // (req, res) => `'nonce-${res.locals.cspNonce}'`,
    ],
    'style-src': [
      "'self'",
      // TODO: remove unsafe-inline if in production, this is required for react-error-overlay
      "'unsafe-inline'",
      'https://fonts.googleapis.com',
      // (req, res) => `'nonce-${res.locals.cspNonce}'`,
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
    'media-src': ['data:', '*', 'blob:'],
    upgradeInsecureRequests: [],
  },
};

export default config;
