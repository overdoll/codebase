import { getBrowserVisibilityProp, getIsDocumentHidden } from './support'
import { useEffect, useState } from 'react'

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
