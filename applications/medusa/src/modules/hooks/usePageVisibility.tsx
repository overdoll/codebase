import { useEffect, useState } from 'react'

export function getBrowserVisibilityProp (): string | null {
  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    return 'visibilitychange'
  } else if (typeof document.msHidden !== 'undefined') {
    return 'msvisibilitychange'
  } else if (typeof document.webkitHidden !== 'undefined') {
    return 'webkitvisibilitychange'
  }
  return null
}

export function getBrowserDocumentHiddenProp (): string | null {
  if (typeof document.hidden !== 'undefined') {
    return 'hidden'
  } else if (typeof document.msHidden !== 'undefined') {
    return 'msHidden'
  } else if (typeof document.webkitHidden !== 'undefined') {
    return 'webkitHidden'
  }
  return null
}

export function getIsDocumentHidden (): boolean {
  const hiddenProp = getBrowserDocumentHiddenProp()

  return hiddenProp != null ? !(document[hiddenProp]) : false
}

export function usePageVisibility (): boolean {
  const [isVisible, setIsVisible] = useState(getIsDocumentHidden())
  const onVisibilityChange = (): void => setIsVisible(getIsDocumentHidden())

  useEffect(() => {
    const visibilityChange = getBrowserVisibilityProp()
    if (visibilityChange == null) return

    document.addEventListener(visibilityChange, onVisibilityChange, false)

    return () => {
      document.removeEventListener(visibilityChange, onVisibilityChange)
    }
  })

  return isVisible
}
