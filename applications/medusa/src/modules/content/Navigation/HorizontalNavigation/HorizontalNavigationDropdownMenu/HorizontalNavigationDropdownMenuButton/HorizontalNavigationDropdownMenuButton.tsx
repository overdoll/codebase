import NavLink from '../../../../../routing/NavLink'
import { forwardRef, ReactNode, useContext } from 'react'
import { HorizontalNavigationDropdownMenuContext } from '../context'
import HorizontalNavigationDropdownMenuButtonBody
  from './HorizontalNavigationDropdownMenuButtonBody/HorizontalNavigationDropdownMenuButtonBody'
import { Box } from '@chakra-ui/react'
import { IconType } from '@//:types/components'
import { UrlObject } from 'url'

interface Props {
  label?: ReactNode
  icon?: IconType
  to?: string
  onClick?: () => void
  isDisabled?: boolean
  color?: string
  children?: ReactNode
  colorScheme?: string
  isActive?: boolean
  href?: string | UrlObject
}

const HorizontalNavigationDropdownMenuButton = forwardRef<any, Props>(({
  label,
  icon,
  onClick,
  isDisabled,
  color,
  children,
  colorScheme,
  isActive = false,
  href,
  ...rest
}: Props, forwardRef): JSX.Element => {
  const ctx = useContext(HorizontalNavigationDropdownMenuContext)

  const onClickMenu = (): void => {
    if (onClick != null) {
      onClick()
    }

    ctx.onClose()
  }

  const ButtonProps = {
    icon,
    color,
    label,
    onClick: onClickMenu,
    isDisabled,
    colorScheme
  }

  if (href == null) {
    return (
      <HorizontalNavigationDropdownMenuButtonBody
        ref={forwardRef}
        isActive={isActive}
        {...ButtonProps}
      >
        {children}
      </HorizontalNavigationDropdownMenuButtonBody>
    )
  }

  return (
    <NavLink
      passHref
      href={href}
      prefetch={false}
      {...rest}
    >
      {({
        isActiveBasePath
      }) => (
        <Box as='a'>
          <HorizontalNavigationDropdownMenuButtonBody
            ref={forwardRef}
            isActive={isActiveBasePath}
            {...ButtonProps}
          >
            {children}
          </HorizontalNavigationDropdownMenuButtonBody>
        </Box>
      )}
    </NavLink>
  )
})

export default HorizontalNavigationDropdownMenuButton
