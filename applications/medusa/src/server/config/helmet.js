export default {
  contentSecurityPolicy: {
    directives: {
      'default-src': ['\'self\''],
      'script-src': [
        '\'self\'',
        'https://cdn.jsdelivr.net/npm/@apollographql/',
        process.env.NODE_ENV === 'production'
          ? (req, res) => `'nonce-${res.locals.cspNonce}'`
          : '\'unsafe-inline\'',
        '\'unsafe-eval\'',
        process.env.PUBLIC_PATH
      ],
      'style-src': [
        '\'self\'',
        'https://cdn.jsdelivr.net/npm/@apollographql/',
        'https://fonts.googleapis.com',
        process.env.NODE_ENV === 'production'
          ? (req, res) => `'nonce-${res.locals.cspNonce}'`
          : '\'unsafe-inline\''
      ],
      'font-src': ['data:', '*'],
      'base-uri': ['\'self\''],
      'object-src': ['\'none\''],
      'connect-src': ['\'self\'', 'blob:'],
      'frame-src': [],
      'frame-ancestors': ['\'none\''],
      'report-uri': [],
      'form-action': ['\'self\''],
      'img-src': ['blob:', 'data:', '*'],
      'media-src': ['data:', '*', 'blob:'],
      upgradeInsecureRequests: []
    }
  },
  expectCt: {
    maxAge: 86400,
    enforce: true
  },
  hsts: false
}
