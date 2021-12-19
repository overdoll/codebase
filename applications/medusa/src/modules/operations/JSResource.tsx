/**
 * A cache of resources to avoid loading the same module twice. This is important
 * because Webpack dynamic imports only expose an asynchronous API for loading
 * modules, so to be able to access already-loaded modules synchronously we
 * must have stored the previous result somewhere.
 *
 */

type Loader = (...args: string[]) => Promise<any>

/**
 * A generic resource: given some method to asynchronously load a value - the loader()
 * argument - it allows accessing the state of the resource.
 */
class Resource {
  _error: Error | null
  _asyncLoader: Loader
  _syncLoader: any
  _resolve: any
  _promise: Promise<string> | null
  _result: JSX.Element | null | any
  _moduleId: (...args: string[]) => string

  constructor (asyncLoader: Loader, syncLoader: any, resolve: any, moduleId: (...args: string[]) => string) {
    this._error = null
    this._asyncLoader = asyncLoader
    this._syncLoader = syncLoader
    this._resolve = resolve
    this._promise = null
    this._result = null
    this._moduleId = moduleId
  }

  /**
   * Loads the resource if necessary.
   *
   * Optionally pass arguments
   */
  async load (...args: any[]): Promise<JSX.Element | null | any> {
    let promise = this._promise
    if (promise === null) {
      promise = this._asyncLoader(...args)
        .then(result => {
          this._result = result.default ?? result
          return this._result
        })
        .catch(error => {
          this._error = error
          throw error
        })
      this._promise = promise
    }
    return await promise
  }

  async loadAsync (...args: any[]): Promise<JSX.Element | null | any> {
    return await this._asyncLoader(...args)
  }

  loadSync (...args: any[]): any {
    this._result = this._syncLoader(args)
    return this._result
  }

  /**
   * Dispose of the JSResource like it was never loaded
   *
   */
  dispose (): void {
    this._promise = null
    this._result = null
    this._error = null
  }

  resolve (): any {
    return this._resolve
  }

  /**
   * Returns the result, if available. This can be useful to check if the value
   * is resolved yet.
   */
  get (): JSX.Element | null | any {
    if (this._result != null) {
      return this._result
    }

    return null
  }

  /**
   * Returns the module identification.
   */
  getModuleId (...args: any[]): string {
    return this._moduleId(...args)
  }

  /**
   * This is the key method for integrating with React Suspense. Read will:
   * - "Suspend" if the resource is still pending (currently implemented as
   *   throwing a Promise, though this is subject to change in future
   *   versions of React)
   * - Throw an error if the resource failed to load.
   * - Return the data of the resource if available.
   */
  read (): JSX.Element | null | Promise<string> | any {
    if (this._result !== null) {
      return this._result
    } else if (this._error !== null) {
      throw this._error
    } else {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw this._promise
    }
  }
}

const resolveConstructor = (ctor) => {
  if (typeof ctor === 'function') {
    return {
      requireAsync: ctor,
      resolve () {
        return undefined
      },
      chunkName () {
        return undefined
      }
    }
  }

  return ctor
}

const loadable = (loader: Loader): Resource => {
  const t = resolveConstructor(loader)
  return new Resource(t.importAsync, t.requireSync, t.resolve, t.chunkName)
}

export default loadable

export type { Resource }
