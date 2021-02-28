/**
 * @flow
 */

/**
 * A cache of resources to avoid loading the same module twice. This is important
 * because Webpack dynamic imports only expose an asynchronous API for loading
 * modules, so to be able to access already-loaded modules synchronously we
 * must have stored the previous result somewhere.
 */
import CanUseDOM from '@//:modules/utilities/CanUseDOM';

const resourceMap = new Map();

/**
 * A generic resource: given some method to asynchronously load a value - the loader()
 * argument - it allows accessing the state of the resource.
 */
class Resource {
  _error: any;
  _loader: any;
  _promise: ?Promise<any>;
  _result: any;
  _moduleId: string;

  constructor(loader: any, moduleId: string) {
    this._error = null;
    this._loader = loader;
    this._promise = null;
    this._result = null;
    this._moduleId = moduleId;
  }

  /**
   * Loads the resource if necessary.
   */
  load(): Promise<any> {
    let promise = this._promise;
    if (promise == null) {
      promise = this._loader()
        .then(result => {
          if (result.default) {
            result = result.default;
          }
          this._result = result;
          return result;
        })
        .catch(error => {
          this._error = error;
          throw error;
        });
      this._promise = promise;
    }
    return promise;
  }

  /**
   * Returns the result, if available. This can be useful to check if the value
   * is resolved yet.
   */
  get(): any {
    if (this._result != null) {
      return this._result;
    }
  }

  /**
   * Returns the module identification.
   */
  getModuleId(): string {
    return this._moduleId;
  }

  /**
   * Returns the module if it's required.
   */
  getModuleIfRequired(): any {
    return this.get();
  }

  /**
   * This is the key method for integrating with React Suspense. Read will:
   * - "Suspend" if the resource is still pending (currently implemented as
   *   throwing a Promise, though this is subject to change in future
   *   versions of React)
   * - Throw an error if the resource failed to load.
   * - Return the data of the resource if available.
   */
  read(): any {
    if (this._result != null) {
      return this._result;
    } else if (this._error != null) {
      throw this._error;
    } else {
      throw this._promise;
    }
  }
}

/**
 * A helper method to create a resource, intended for dynamically loading code.
 *
 * Example:
 * ```
 *    // Before rendering, ie in an event handler:
 *    const resource = JSResource('Foo', () => import('./Foo.js));
 *    resource.load();
 *
 *    // in a React component:
 *    const Foo = resource.read();
 *    return <Foo ... />;
 * ```
 *
 * @param {*} moduleId A globally unique identifier for the resource used for caching
 * @param {*} loader A method to load the resource's data if necessary
 */
export default function JSResource(moduleId: string, loader: any): Resource {
  // On the server side, we want to always create a new instance, because it won't refresh with changes
  if (!CanUseDOM) {
    return new Resource(loader, moduleId);
  }

  let resource = resourceMap.get(moduleId);
  if (resource == null) {
    resource = new Resource(loader, moduleId);
    resourceMap.set(moduleId, resource);
  }

  return resource;
}

export type { Resource };