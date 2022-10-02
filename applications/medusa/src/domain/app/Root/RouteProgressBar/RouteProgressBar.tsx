import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NProgress from 'nprogress'

NProgress.configure({
  showSpinner: false,
  minimum: 0.35,
  easing: 'ease',
  speed: 300
})

export default function RouteProgressBar (): null {
  const router = useRouter()

  const routeChangeStart = (): void => {
    NProgress.start()
  }

  const routeChangeEnd = (): void => {
    NProgress.done()
  }

  useEffect(() => {
    router.events.on('routeChangeStart', routeChangeStart)
    router.events.on('routeChangeComplete', routeChangeEnd)
    router.events.on('routeChangeError', routeChangeEnd)
    return () => {
      router.events.off('routeChangeStart', routeChangeStart)
      router.events.off('routeChangeComplete', routeChangeEnd)
      router.events.off('routeChangeError', routeChangeEnd)
    }
  }, [])

  return null
}
