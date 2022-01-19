import { Request, Response } from 'express'
import helmet from 'helmet'

type HelmetOptions = Parameters<typeof helmet>[0]

const options: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      'default-src': ['\'self\''],
      // @ts-expect-error
      'script-src': [
        '\'self\'',
        'https://cdn.jsdelivr.net/npm/@apollographql/',
        process.env.NODE_ENV === 'production'
          ? (req: Request, res: Response) => `'nonce-${res.locals.cspNonce as string}'`
          : '\'unsafe-inline\'',
        '\'unsafe-eval\'',
        process.env.PUBLIC_PATH,
        process.env.URL
      ],
      'style-src': [
        '\'self\'',
        'https://cdn.jsdelivr.net/npm/@apollographql/',
        'https://fonts.googleapis.com',
        process.env.NODE_ENV === 'production'
          ? (req: Request, res: Response) => `'nonce-${res.locals.cspNonce as string}'`
          : '\'unsafe-inline\''
      ],
      'font-src': ['data:', '*'],
      'base-uri': ['\'self\''],
      'object-src': ['\'none\''],
      // @ts-expect-error
      'connect-src': ['\'self\'', 'blob:', process.env.URL, 'https://localhost:3001', 'wss://localhost:3001'],
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
