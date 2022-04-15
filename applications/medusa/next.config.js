const path = require('path')
const relay = require('./relay.config.js')
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Permissions-Policy',
    value: ''
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: 'default-src https://fonts.gstatic.com https://dcd9vpqfvvgum.cloudfront.net data: blob: \'self\' \'unsafe-inline\' \'unsafe-eval\' ;script-src \'unsafe-inline\' \'unsafe-eval\' blob: data: \'self\';style-src https://fonts.googleapis.com data: \'unsafe-inline\';connect-src \'self\' ws://localhost:* blob: ;media-src \'self\' data:;frame-src \'none\' ;object-src \'none\' ;worker-src blob: data:;block-all-mixed-content;upgrade-insecure-requests;'
  }
]

module.exports = {
  async headers () {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders
      }
    ]
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  experimental: {
    runtime: 'nodejs',
    concurrentFeatures: true
  },
  serverRuntimeConfig: {
    projectRoot: __dirname
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      '@//:modules': path.resolve(__dirname, 'src/modules'),
      '@//:artifacts': path.resolve(__dirname, 'src/__generated__'),
      '@//:types': path.resolve(__dirname, 'src/types'),
      '@//:assets': path.resolve(__dirname, 'src/assets'),
      '@//:domain': path.resolve(__dirname, 'src/domain'),
      '@//:common': path.resolve(__dirname, 'src/common')
    }

    return config
  }
}
