const { withSentryConfig } = require('@sentry/nextjs')
const nextBuildId = require('next-build-id')
const { DefinePlugin } = require('webpack')
const withPWA = require('next-pwa')
const withPlugins = require('next-compose-plugins')

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
    value: 'default-src https://s3.amazonaws.com/sandbox-overdoll-uploads/ https://sandbox-overdoll-resources.s3.amazonaws.com https://s3.amazonaws.com/overdoll-uploads/ https://static.dollycdn.net https://resources.dollycdn.net https://private-resources.dollycdn.net https://fonts.gstatic.com https://dcd9vpqfvvgum.cloudfront.net https://cdn.usefathom.com data: blob: \'self\' \'unsafe-inline\' \'unsafe-eval\' ;script-src https://cdn.usefathom.com/script.js https://static.dollycdn.net \'unsafe-inline\' \'unsafe-eval\' blob: data: \'self\';style-src https://fonts.googleapis.com https://static.dollycdn.net data: \'self\' \'unsafe-inline\';connect-src \'self\' https://o1273644.ingest.sentry.io ws://localhost:* blob: ;media-src https://s3.amazonaws.com/sandbox-overdoll-uploads https://s3.amazonaws.com/overdoll-uploads https://dcd9vpqfvvgum.cloudfront.net https://resources.dollycdn.net https://private-resources.dollycdn.net https://overdoll-uploads.s3.amazonaws.com https://sandbox-overdoll-resources.s3.amazonaws.com \'self\' data:;frame-src \'none\' ;object-src blob: data: ;worker-src \'self\' blob: data:;block-all-mixed-content;upgrade-insecure-requests;'
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

const manifestRegexFilters = [
  /static\/chunks\/pages\/staff/u,
  /static\/chunks\/pages\/settings/u,
  /static\/chunks\/pages\/moderation/u,
  /static\/chunks\/pages\/club/u,
  /static\/chunks\/pages\/profile/u
]

const moduleExports = withBundleAnalyzer({
  pwa: {
    manifestTransforms: [
      async (manifestEntries) => {
        const manifest = manifestEntries
          .filter((m) => {
            for (let i = 0; i < manifestRegexFilters.length; i++) {
              if (m.url.match(manifestRegexFilters[i])) {
                return false
              }
            }

            return true
          })
          .map((m) => {
            if (!/^(?:[a-z]+:)?\/\//.test(m.url)) {
              // add cdn origin for relative urls
              m.url = `${process.env.STATIC_ASSETS_URL}${m.url}`
            }
            return m
          })

        return {
          manifest,
          warnings: []
        }
      }
    ],
    dest: 'public',
    mode: 'production',
    dynamicStartUrl: true,
    cacheOnFrontEndNav: false,
    runtimeCaching: [
      {
        urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-font-assets',
          expiration: {
            maxEntries: 4,
            maxAgeSeconds: 31536000
          }
        }
      },
      {
        urlPattern: /\.(?:js)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-js-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 31536000
          }
        }
      },
      {
        urlPattern: /\.(?:css|less)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-style-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 31536000
          }
        }
      },
      {
        urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'next-data',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
          }
        }
      },
      {
        urlPattern: /\.(?:json|xml|csv)$/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'static-data-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
          }
        }
      }
    ]
  },
  async headers () {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders
      },
      {
        source: '/service-worker.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=43200, immutable'
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/'
          }
        ]
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
  webpack: (config, {
    buildId,
    isServer,
    dev
  }) => {
    config.plugins.push(
      new DefinePlugin({
        'process.env.NEXT_BUILD_ID': JSON.stringify(buildId)
      })
    )

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

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

    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-ssr-prepass': false,
        buffer: false
      }
    }

    if (process.env.ENABLE_PROFILER === 'true' && !dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling'
      }
    }

    return config
  }
})

let finalConfig

if (process.env.PRODUCTION_DEPLOYMENT != null) {
  moduleExports.sentry = {
    hideSourceMaps: true,
    setCommits: { auto: true }
  }
  moduleExports.assetPrefix = process.env.STATIC_ASSETS_URL
  finalConfig = withPlugins([(nextConfig) => withSentryConfig(nextConfig, { silent: true }), withPWA], moduleExports)
} else {
  moduleExports.sentry = {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true
  }

  finalConfig = withPlugins([withSentryConfig, withPWA], moduleExports)
}

module.exports = finalConfig
