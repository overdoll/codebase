/**
 * A cache of resources to avoid loading the same module twice. This is important
 * because Webpack dynamic imports only expose an asynchronous API for loading
 * modules, so to be able to access already-loaded modules synchronously we
 * must have stored the previous result somewhere.
 *
 */
import CanUseDOM from './CanUseDOM'

type Loader = any
type SyncLoader = any

class PromisedResource {
  _error: Error | null
  _loader: Loader
  _promise: Promise<string> | null
  _result: JSX.Element | null
  _moduleId: string

  constructor (loader: Loader, moduleId: string) {
    this._error = null
    this._loader = loader
    this._promise = null
    this._result = null
    this._moduleId = moduleId
  }

  /**
   * Loads the resource if necessary.
   */
  async load (): Promise<any> {
    let promise = this._promise
    if (promise === null) {
      promise = this._loader()
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

  /**
   * Returns the result, if available. This can be useful to check if the value
   * is resolved yet.
   */
  get (): JSX.Element | null {
    if (this._result !== null) {
      return this._result
    }

    return null
  }

  /**
   * Returns the module identification.
   */
  getModuleId (): string {
    return this._moduleId
  }

  /**
   * This is the key method for integrating with React Suspense. Read will:
   * - "Suspend" if the resource is still pending (currently implemented as
   *   throwing a Promise, though this is subject to change in future
   *   versions of React)
   * - Throw an error if the resource failed to load.
   * - Return the data of the resource if available.
   */
  read (): JSX.Element | null | Promise<string> {
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

class ServerResource {
  _loader: SyncLoader

  constructor (loader: SyncLoader) {
    this._loader = loader
  }

  async load (...args: any[]): Promise<any> {
    return await Promise.resolve(this.get(...args))
  }

  getModuleId (...args: any[]): string {
    return this._loader.chunkName(...args)
  }

  read (...args: any[]): any {
    this._loader.requireAsync(...args).catch(() => null)
    const module = this._loader.requireSync(...args)

    return module.__esModule != null
      ? module.default
      : module.default ?? module
  }

  get (...args: any[]): any {
    return this.read(...args)
  }
}

/**
 * A generic resource: given some method to asynchronously load a value - the loader()
 * argument - it allows accessing the state of the resource.
 */
class ClientResource {
  _error: Error | null
  _loader: Loader
  _resolve: any
  _promise: Promise<string> | null
  _result: JSX.Element | null | any

  constructor (loader: Loader) {
    this._error = null
    this._loader = loader
    this._promise = null
    this._result = null
  }

  /**
   * Loads the resource if necessary.
   *
   * Optionally pass arguments
   */
  async load (...args: any[]): Promise<JSX.Element | null | any> {
    let promise = this._promise
    if (promise === null) {
      promise = this._loader.requireAsync(...args)
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

  /**
   * Returns the result, if available. This can be useful to check if the value
   * is resolved yet.
   */
  get (...args: any[]): JSX.Element | null | any {
    if (this._result != null) {
      return this._result
    }

    return null
  }

  /**
   * Returns the module identification.
   */
  getModuleId (...args: any[]): string {
    return this._loader.chunkName(...args)
  }

  /**
   * This is the key method for integrating with React Suspense. Read will:
   * - "Suspend" if the resource is still pending (currently implemented as
   *   throwing a Promise, though this is subject to change in future
   *   versions of React)
   * - Throw an error if the resource failed to load.
   * - Return the data of the resource if available.
   */
  read (...args: any[]): JSX.Element | null | Promise<string> | any {
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

const resourceMap = new Map()

const loadable = (loader: Loader): ClientResource | ServerResource => {
  const t = resolveConstructor(loader)

  if (!CanUseDOM) {
    return new ServerResource(t)
  }

  return new ClientResource(t)
}

const Resource = (moduleId: string, loader: Loader): PromisedResource => {
  let resource = resourceMap.get(moduleId)

  if (resource == null) {
    resource = new PromisedResource(loader, moduleId)
    resourceMap.set(moduleId, resource)
  }

  return resource
}

export {
  loadable,
  Resource
}

export type { ClientResource, ServerResource, PromisedResource }
