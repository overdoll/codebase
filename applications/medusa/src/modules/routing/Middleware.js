/**
 * Middleware class
 *
 * Can be used to easily separate classes in Javascript - so we can have a "pre" middleware and a "post" middleware,
 * one can run before the API call, and one can run after the API call
 */
class Middleware {
  constructor(middlewares) {
    this.middlewares = middlewares;
  }

  getMiddleware() {
    return this.middlewares;
  }
}

export class Before extends Middleware {}

export class After extends Middleware {}

/**
 * @param middleware
 *
 * Run the middleware
 *
 */
export function Run(middleware, environment, context) {
  for (let i = 0; i < middleware.length; i++) {
    if (!middleware[i](environment, context)) {
      return false;
    }
  }

  return true;
}
