import pathToRegexp from 'path-to-regexp'
import type { Match } from './router'

// taken from https://github.com/remix-run/react-router/blob/v5.3.0/packages/react-router/modules/matchPath.js

const cache = {}
const cacheLimit = 10000
let cacheCount = 0

interface Key {
  name: string
}

interface Compiled {
  regexp: RegExp
  keys: Key[]
}

interface Options {
  end?: boolean
  strict?: boolean
  sensitive?: boolean
  exact?: boolean
  path?: string | string[] | any
}

const compilePath = (path: string, options: Options): Compiled => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`
  const pathCache = cache[cacheKey] ?? (cache[cacheKey] = {})

  if (pathCache[path] != null) return pathCache[path]

  const keys = []
  const regexp = pathToRegexp(path, keys, options)
  const result = {
    regexp,
    keys
  }

  if (cacheCount < cacheLimit) {
    pathCache[path] = result
    cacheCount++
  }

  return result
}

export default function matchPath (pathname: string, options: Options = {}): Match | null {
  if (typeof options === 'string' || Array.isArray(options)) {
    options = { path: options }
  }

  const {
    path,
    exact = false,
    strict = false,
    sensitive = false
  } = options

  const paths = [].concat(path)

  return paths.reduce((matched, path) => {
    if (!path && path !== '') return null
    if (matched != null) return matched

    const {
      regexp,
      keys
    } = compilePath(path, {
      end: exact,
      strict,
      sensitive
    })
    const match = regexp.exec(pathname)

    if (match == null) return null

    const [url, ...values] = match
    const isExact = pathname === url

    if (exact && !isExact) return null

    return {
      path, // the path used to match
      url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
      isExact, // whether or not we matched exactly
      params: keys.reduce((memo, key, index) => {
        memo[key.name] = values[index]
        return memo
      }, {})
    }
  }, null)
}
