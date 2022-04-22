import { Fade, Progress } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function RouterLoadingBar (): JSX.Element {
  const [isOpen, setOpen] = useState(false)

  const router = useRouter()

  const routeChangeStart = (): void => {
    setOpen(true)
  }

  const routeChangeEnd = (): void => {
    setOpen(false)
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

  return (
    <Fade
      style={{
        position: 'fixed',
        zIndex: 11,
        width: '100%',
        top: 0
      }}
      in={isOpen}
    >
      <Progress
        w='100%'
        top={0}
        right={0}
        left={0}
        hasStripe
        isAnimated
        value={100}
        colorScheme='primary'
        h={1}
        borderRadius='none'
      />
    </Fade>

  )
}
