import { ReactNode } from 'react'
import NavLink from '../../../../routing/NavLink'
import VerticalNavigationButtonBody from './VerticalNavigationButtonBody/VerticalNavigationButtonBody'
import { LinkProps } from 'next/link'
import { Box } from '@chakra-ui/react'
import { IconType } from '@//:types/components'

interface Props extends LinkProps {
  title: ReactNode
  icon?: IconType | undefined
  colorScheme?: string
  buttonType?: 'primary' | 'secondary'
  isExternal?: boolean
  prefetch?: boolean
}

export default function VerticalNavigationButton ({
  title,
  icon,
  colorScheme = 'gray',
  buttonType = 'secondary',
  isExternal = false,
  href,
  prefetch,
  ...rest
}: Props): JSX.Element {
  const ButtonProps = {
    title,
    icon,
    colorScheme,
    buttonType,
    isExternal
  }

  return (
    <NavLink
      passHref
      href={href}
      prefetch={prefetch === false ? false : undefined}
      {...rest}
    >
      {({
        isActiveBasePath
      }) => (
        <Box as='a'>
          <VerticalNavigationButtonBody
            isActive={isActiveBasePath}
            {...ButtonProps}
          />
        </Box>
      )}
    </NavLink>
  )
}
