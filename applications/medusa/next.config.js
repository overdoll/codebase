const { withSentryConfig } = require('@sentry/nextjs')
const nextBuildId = require('next-build-id')
const { DefinePlugin } = require('webpack')

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
    value: 'default-src https://s3.amazonaws.com/sandbox-overdoll-uploads https://s3.amazonaws.com/overdoll-uploads https://static.dollycdn.net https://resources.dollycdn.net https://private-resources.dollycdn.net https://fonts.gstatic.com https://dcd9vpqfvvgum.cloudfront.net https://sandbox-overdoll-resources.s3.amazonaws.com https://cdn.usefathom.com data: blob: \'self\' \'unsafe-inline\' \'unsafe-eval\' ;script-src https://cdn.usefathom.com/script.js https://static.dollycdn.net \'unsafe-inline\' \'unsafe-eval\' blob: data: \'self\';style-src https://fonts.googleapis.com https://static.dollycdn.net data: \'self\' \'unsafe-inline\';connect-src \'self\' https://o1273644.ingest.sentry.io ws://localhost:* blob: ;media-src https://s3.amazonaws.com/sandbox-overdoll-uploads https://s3.amazonaws.com/overdoll-uploads https://dcd9vpqfvvgum.cloudfront.net https://resources.dollycdn.net https://private-resources.dollycdn.net https://overdoll-uploads.s3.amazonaws.com https://sandbox-overdoll-resources.s3.amazonaws.com \'self\' data:;frame-src \'none\' ;object-src blob: data: ;worker-src \'self\' blob: data:;block-all-mixed-content;upgrade-insecure-requests;'
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

const moduleExports = withBundleAnalyzer({
  async headers () {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders
      }
    ]
  },
  rewrites: async () => {
    return [
      {
        source: '/readyz',
        destination: '/api/readyz'
      }
    ]
  },
  generateBuildId: () => nextBuildId({ dir: __dirname }),
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
  webpack: (config, { buildId }) => {
    config.plugins.push(
      new DefinePlugin({
        'process.env.NEXT_BUILD_ID': JSON.stringify(buildId)
      })
    )

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

let sentryConfig

if (process.env.PRODUCTION_DEPLOYMENT != null) {
  moduleExports.sentry = {
    hideSourceMaps: true,
    setCommits: { auto: true }
  }
  moduleExports.assetPrefix = process.env.STATIC_ASSETS_URL
  sentryConfig = withSentryConfig(moduleExports, { silent: true })
} else {
  moduleExports.sentry = {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true
  }
  sentryConfig = withSentryConfig(moduleExports)
}

module.exports = sentryConfig
