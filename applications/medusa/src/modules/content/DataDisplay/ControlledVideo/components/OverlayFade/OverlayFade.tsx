import { Fade, HTMLChakraProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  onClick: () => void
  children: ReactNode
}

export default function OverlayFade ({
  onClick,
  children
}: Props): JSX.Element {
  return (
    <Fade in>
      {children}
    </Fade>
  )
}
