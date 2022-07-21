import { forwardRef, ReactNode } from 'react'
import NavLink from '../../../../routing/NavLink'
import HorizontalNavigationButtonBody from './HorizontalNavigationButtonBody/HorizontalNavigationButtonBody'
import { UrlObject } from 'url'
import { Box, ButtonProps } from '@chakra-ui/react'
import { IconType } from '@//:types/components'

interface Props extends ButtonProps {
  icon?: IconType
  label: ReactNode
  exact?: boolean
  children?: ReactNode
  isActive?: boolean
  href?: string | UrlObject
}

const HorizontalNavigationButton = forwardRef<any, Props>(({
  icon,
  label,
  onClick,
  children,
  exact = false,
  colorScheme = 'gray',
  isActive = false,
  as,
  href
}: Props, forwardRef): JSX.Element => {
  const ButtonProps = {
    icon,
    label,
    onClick,
    colorScheme,
    ref: forwardRef
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
