const path = require('path')
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
    value: 'default-src https://fonts.gstatic.com https://dcd9vpqfvvgum.cloudfront.net https://sandbox-overdoll-resources.s3.amazonaws.com data: blob: \'self\' \'unsafe-inline\' \'unsafe-eval\' ;script-src \'unsafe-inline\' \'unsafe-eval\' blob: data: \'self\';style-src https://fonts.googleapis.com data: \'self\' \'unsafe-inline\';connect-src \'self\' ws://localhost:* blob: ;media-src https://dcd9vpqfvvgum.cloudfront.net \'self\' data:;frame-src \'none\' ;object-src blob: data: ;worker-src blob: data:;block-all-mixed-content;upgrade-insecure-requests;'
  }
]

let withBundleAnalyzer = (data) => {
  return data
}

if (process.env.ANALYZE === 'true') {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
  })
}

module.exports = withBundleAnalyzer({
  async headers () {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders
      }
    ]
  },
  distDir: 'build',
  generateEtags: false,
  poweredByHeader: false,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  experimental: {
    runtime: 'nodejs',
    concurrentFeatures: true,
    outputStandalone: true
  },
  serverRuntimeConfig: {
    projectRoot: __dirname
  },
  typescript: {
    // ignore build errors because we already check for it as part of our pipeline
    // also Next.js only shows 1 error at a time which is really annoying
    ignoreBuildErrors: true
  },
  eslint: {
    // ignore build errors because we already check for it as part of our pipeline
    // also Next.js only shows 1 error at a time which is really annoying
    ignoreDuringBuilds: true
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    // don't polyfill crypto package
    config.resolve.alias.crypto = false

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
})
