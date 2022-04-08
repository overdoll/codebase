import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { ColorScheme } from '@//:types/components'
import { Link } from '@//:modules/routing'
import { ReactNode } from 'react'

interface Props extends LinkProps {
  children: ReactNode
  colorScheme?: ColorScheme | undefined
  isExternal?: boolean | undefined
  to: string
}

export default function LinkInline ({
  children,
  colorScheme = 'gray',
  to,
  isExternal,
  ...rest
}: Props): JSX.Element {
  const color = colorScheme == null ? undefined : (colorScheme === 'gray' ? `${colorScheme}.00` : `${colorScheme}.400`)

  if (isExternal === true) {
    return (
      <ChakraLink
        color={color}
        isExternal
        href={to}
        {...rest}
      >
        {children}
      </ChakraLink>
    )
  }

  return (
    <Link to={to}>
      {children}
    </Link>
  )
}
