import { forwardRef, ReactNode } from 'react'
import NavLink from '../../../../routing/NavLink'
import HorizontalNavigationButtonBody from './HorizontalNavigationButtonBody/HorizontalNavigationButtonBody'
import { UrlObject } from 'url'
import { Box, ButtonProps } from '@chakra-ui/react'
import { IconType } from '@//:types/components'

interface Props extends ButtonProps {
  icon: IconType
  label: ReactNode
  exact?: boolean
  children?: ReactNode
  isActive?: boolean
  href?: string | UrlObject
  hasBadge?: boolean
}

const HorizontalNavigationButton = forwardRef<any, Props>((props: Props, forwardRef): JSX.Element => {
  const {
    icon,
    label,
    onClick,
    children,
    exact = false,
    colorScheme = 'gray',
    isActive = false,
    href,
    hasBadge = false
  } = props

  const ButtonProps = {
    icon,
    label,
    onClick,
    colorScheme,
    ref: forwardRef,
    hasBadge
  }

  if (href == null) {
    return (
      <HorizontalNavigationButtonBody
        isActive={isActive}
        {...ButtonProps}
      >{children}
      </HorizontalNavigationButtonBody
      >
    )
  }

  return (
    <NavLink
      passHref
      href={href}
    >
      {({
        isActiveBasePath,
        isActive
      }) => {
        const determineActive = exact ? isActive : isActiveBasePath
        return (
          <Box as='a'>
            <HorizontalNavigationButtonBody
              isActive={determineActive}
              {...ButtonProps}
            >
              {children}
            </HorizontalNavigationButtonBody>
          </Box>
        )
      }}
    </NavLink>
  )
})

export default HorizontalNavigationButton
