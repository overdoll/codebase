import { UrlObject } from 'url'
import { useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { Link } from '../../../../../routing'
import { useRouter } from 'next/router'

interface Props {
  href: UrlObject | string
  onClick?: () => void
  watch: unknown[]
}

export default function LinkActivator (props: Props): JSX.Element {
  const {
    href,
    onClick,
    watch
  } = props

  const boxRef = useRef<HTMLAnchorElement & HTMLDivElement | null>(null)

  const router = useRouter()

  const [destination, setDestination] = useState<UrlObject | string>(href)

  const onClickLink = (): void => {
    void router.push(href)
    onClick?.()
  }

  useEffect(() => {
    const onMouseEnter = (): void => {
      setDestination(href)
    }

    boxRef.current?.addEventListener('mouseenter', onMouseEnter)
    return () => {
      boxRef.current?.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [boxRef, ...watch, href])

  return (
    <Link
      passHref
      href={destination}
    >
      <Box
        ref={boxRef}
        as='a'
        onClick={onClickLink}
        position='absolute'
        top={0}
        bottom={0}
        left={0}
        right={0}
        cursor='pointer'
      />
    </Link>
  )
}
