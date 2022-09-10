import { Ref, useEffect } from 'react'

/**
 * Proper state management for nested modals.
 * Simplified, but inspired by material-ui's ModalManager class.
 */

class ModalManager {
  modals: any[]

  constructor () {
    this.modals = []
  }

  add (modal: any): void {
    this.modals.push(modal)
  }

  remove (modal: any): void {
    this.modals = this.modals.filter((_modal) => _modal !== modal)
  }

  isTopModal (modal: any): boolean {
    const topmostModal = this.modals[this.modals.length - 1]
    return topmostModal === modal
  }
}

export const manager = new ModalManager()

export function useModalManager (ref: Ref<any>, isOpen?: boolean): void {
  useEffect(() => {
    if (isOpen === true) {
      manager.add(ref)
    }
    return () => {
      manager.remove(ref)
    }
  }, [isOpen, ref])
}
