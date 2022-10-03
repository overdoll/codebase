import { useEffect } from 'react'

export default function usePreventWindowUnload (isPrevented: boolean): void {
  useEffect(() => {
    if (!isPrevented) return
    const handleBeforeUnload = (e): void => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isPrevented])
}
