declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __coverage__: any
    }
  }
}

export default function handler (req, res): void {
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  res.status(200).json({
    coverage: global.__coverage__ ?? null
  })
}
