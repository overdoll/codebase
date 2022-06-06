import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { ColorScheme } from '@//:types/components'
import { ReactNode } from 'react'

interface Props extends LinkProps {
  children: ReactNode
  colorScheme?: ColorScheme | undefined
  isExternal?: boolean | undefined
  href: string
}

export default function LinkInline ({
  children,
  colorScheme = 'gray',
  href,
  isExternal,
  ...rest
}: Props): JSX.Element {
  const color = colorScheme == null ? undefined : (colorScheme === 'gray' ? `${colorScheme}.00` : `${colorScheme}.300`)

  if (isExternal === true) {
    return (
      <ChakraLink
        color={color}
        isExternal
        href={href}
        {...rest}
      >
        {children}
      </ChakraLink>
    )
  }

  return (
    <></>
  )
}
