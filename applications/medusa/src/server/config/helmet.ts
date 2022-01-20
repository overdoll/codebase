import helmet from 'helmet'

type HelmetOptions = Parameters<typeof helmet>[0]

const options: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      'default-src': ['\'self\''],
      'script-src': [
        '\'self\'',
        'https://cdn.jsdelivr.net/npm/@apollographql/'
      ],
      'style-src': [
        '\'self\'',
        '\'unsafe-inline\'',
        'https://fonts.googleapis.com',
        'https://cdn.jsdelivr.net/npm/@apollographql/'
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

if (process.env.NODE_ENV !== 'production' && process.env.REMOTE_DEV !== 'true') {
  // @ts-expect-error
  options.contentSecurityPolicy.directives['script-src'].push('https://localhost:3001')
  // @ts-expect-error
  options.contentSecurityPolicy.directives['style-src'].push('https://localhost:3001')
  // @ts-expect-error
  options.contentSecurityPolicy.directives['connect-src'].push('wss://localhost:3001')
  // @ts-expect-error
  options.contentSecurityPolicy.directives['connect-src'].push('https://localhost:3001')
}

if (process.env.NODE_ENV === 'production') {
  // @ts-expect-error
  options.contentSecurityPolicy.directives['script-src'].push((req: Request, res: Response) => `'nonce-${res.locals.cspNonce as string}'`)
  // options.contentSecurityPolicy.directives['style-src'].push((req: Request, res: Response) => `'nonce-${res.locals.cspNonce as string}'`)
} else {
  // @ts-expect-error
  options.contentSecurityPolicy.directives['script-src'].push('\'unsafe-inline\'')
  // @ts-expect-error
  options.contentSecurityPolicy.directives['script-src'].push('\'unsafe-eval\'')
}

export default options
