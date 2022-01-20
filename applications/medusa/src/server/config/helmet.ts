import helmet from 'helmet'

type HelmetOptions = Parameters<typeof helmet>[0]

const options: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      'default-src': ['\'self\''],
      'script-src': [
        '\'self\'',
        'https://cdn.jsdelivr.net/npm/@apollographql/',
        //     (req: Request, res: Response) => `'nonce-${res.locals.cspNonce as string}'`,
        '\'unsafe-inline\'',
        '\'unsafe-eval\'',
        'https://localhost:3001'
      ],
      'style-src': [
        '\'self\'',
        'https://cdn.jsdelivr.net/npm/@apollographql/',
        'https://fonts.googleapis.com',
        //      (req: Request, res: Response) => `'nonce-${res.locals.cspNonce as string}'`,
        '\'unsafe-inline\'',
        'https://localhost:3001'
      ],
      'font-src': ['data:', '*'],
      'base-uri': ['\'self\''],
      'object-src': ['\'none\''],
      'connect-src': ['\'self\'', 'blob:', 'https://localhost:3001', 'wss://localhost:3001'],
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

export default options
