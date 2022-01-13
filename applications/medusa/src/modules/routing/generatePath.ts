import pathToRegexp from 'path-to-regexp'

const cache = {}
const cacheLimit = 10000
let cacheCount = 0

function compilePath (path): (p: any, s: any) => string {
  if (cache[path] != null) return cache[path]

  const generator = pathToRegexp.compile(path)

  if (cacheCount < cacheLimit) {
    cache[path] = generator
    cacheCount++
  }

  return generator
}

/**
 * Public API for generating a URL pathname from a path and parameters.
 */
function generatePath (path = '/', params = {}): string {
  return path === '/' ? path : compilePath(path)(params, { pretty: true })
}

export default generatePath
