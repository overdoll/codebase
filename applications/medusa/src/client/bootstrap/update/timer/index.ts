// TODO: should clean up code
// https://github.com/marmelab/battery-friendly-timer
class BatteryFriendlyTimer {
  private readonly win: any
  private isFetching: boolean
  private latestId: number
  private readonly timeouts: {}
  private readonly forceTimeouts: {}
  private readonly intervals: {}
  private readonly forceIntervals: {}

  constructor (win) {
    this.win = win
    this.isFetching = false
    this.latestId = 0
    this.timeouts = {}
    this.forceTimeouts = {}
    this.intervals = {}
    this.forceIntervals = {}
  }

  fetchHappens (): void {
    if (this.isFetching) {
      return
    }
    this.isFetching = true
    const now = Date.now()
    Object.keys(this.timeouts).forEach(timeoutKey => {
      const timeout = this.timeouts[timeoutKey]
      if (now - timeout.from >= timeout.tryDelay) {
        timeout.callback()
        this.clearTimeout(timeoutKey)
      }
    })
    Object.keys(this.intervals).forEach(intervalKey => {
      const interval = this.intervals[intervalKey]
      if ((now - interval.latest) >= interval.tryDelay) {
        interval.callback()
        interval.latest = now - ((now - interval.from) % interval.tryDelay)
      }
    })
    this.isFetching = false
  }

  setTimeout (callback, tryDelay, forceDelay): number {
    const latestId = ++this.latestId
    this.timeouts[latestId] = {
      from: Date.now(),
      callback,
      tryDelay
    }
    this.forceTimeouts[latestId] = this.win.setTimeout(callback, forceDelay)
    return latestId
  }

  clearTimeout (id): void {
    this.win.clearTimeout(this.forceTimeouts[id])
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.timeouts[id]
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.forceTimeouts[id]
  }

  setInterval (callback, tryDelay, forceDelay): number {
    const latestId = ++this.latestId
    let now = Date.now()
    const interval = {
      from: now,
      latest: now,
      callback,
      tryDelay,
      forceDelay
    }
    this.intervals[latestId] = interval
    this.forceIntervals[latestId] = this.win.setInterval(() => {
      now = Date.now()
      if ((now - interval.latest) >= interval.forceDelay) {
        callback()
        interval.latest = now
      }
    }, forceDelay)
    return latestId
  }

  clearInterval (id): void {
    this.win.clearInterval(this.forceIntervals[id])
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.intervals[id]
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.forceIntervals[id]
  }
}

export default BatteryFriendlyTimer
