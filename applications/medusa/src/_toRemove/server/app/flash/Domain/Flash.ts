/**
 * Module dependencies.
 */
import { format } from 'util'

/**
 *
 * Modified Flash: will not flush messages when they are read - we flush them manually when sending back the page (in case there are some backend failures, messages will be displayed on next view)
 *
 * Queue flash `msg` of the given `type`.
 *
 * Examples:
 *
 *      req.flash.push('info', 'email sent');
 *      req.flash.push('error', 'email delivery failed');
 *      req.flash.push('info', 'email re-sent');
 *      // => 2
 *
 *      req.flash.get('info');
 *      // => ['email sent', 'email re-sent']

 *
 *      req.flash.get();
 *      // => { error: ['email delivery failed'], info: [] }
 *
 * Formatting:
 *
 * Flash notifications also support arbitrary formatting support.
 * For example you may pass variable arguments to `req.flash()`
 * and use the %s specifier to be replaced by the associated argument:
 *
 *     req.flash('info', 'email has been sent to %s.', userName);
 *
 * Formatting uses `util.format()`, which is available on Node 0.6+.
 */

export default class Flash {
  private msgs: Map<string, unknown>
  private session: any

  constructor (req, options = {}) {
    if (req.session === undefined) throw Error('req.flash() requires sessions')
    this.msgs = req.session.flash ?? {}
    this.session = req.session
  }

  flush (key?: string): Map<string, unknown> | undefined | string[] {
    if (key == null) {
      delete this.session.flash
      return this.msgs
    }

    const arr = this.msgs[key]
    if (Array.isArray(arr)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.msgs[key]
      return arr
    }
  }

  push (key, msg): Map<string, unknown> | undefined | string[] {
    if (arguments.length > 2) {
      const args = Array.prototype.slice.call(arguments, 1)
      msg = format.apply(undefined, args)
    } else if (Array.isArray(msg)) {
      msg.forEach(function (val) {
        (this.msgs[key] = this.msgs[key] ?? []).push(val)
      })
      this.session.flash = this.msgs
      return this.msgs[key].length
    }
    const ret = (this.msgs[key] = this.msgs[key] ?? []).push(msg)
    this.session.flash = this.msgs
    return ret
  }

  get (key: string): Map<string, unknown> | undefined | string[] {
    if (key != null || key !== undefined) {
      return this.msgs
    }

    return this.msgs[key] ?? []
  }
}
