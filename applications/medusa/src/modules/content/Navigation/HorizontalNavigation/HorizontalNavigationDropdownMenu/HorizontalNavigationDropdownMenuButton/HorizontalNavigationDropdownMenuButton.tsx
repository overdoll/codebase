import { forwardRef, ReactNode, useContext } from 'react'
import { IconType } from '@//:types/components'
import { UrlObject } from 'url'
import { HorizontalNavigationDropdownMenuContext } from '../context'
import DesktopHorizontalNavigationDropdownMenuButtonBody
  from '../DesktopHorizontalNavigationDropdownMenu/DesktopHorizontalNavigationDropdownMenuButton/DesktopHorizontalNavigationDropdownMenuButtonBody/DesktopHorizontalNavigationDropdownMenuButtonBody'
import NavLink from '../../../../../routing/NavLink'
import { Box } from '@chakra-ui/react'

interface Props {
  label?: ReactNode
  icon?: IconType
  to?: string
  onClick?: () => void
  children?: ReactNode
  isActive?: boolean
  href?: string | UrlObject
}

const MobileHorizontalNavigationDropdownMenuButton = forwardRef<any, Props>((props: Props, forwardRef): JSX.Element => {
  const {
    label,
    icon,
    onClick,
    children,
    href
  } = props

  const ctx = useContext(HorizontalNavigationDropdownMenuContext)

  const onClickMenu = (): void => {
    if (onClick != null) {
      onClick()
    }

    ctx.onClose()
  }

  const ButtonProps = {
    icon,
    label,
    onClick: onClickMenu
  }

  if (href == null) {
    return (
      <DesktopHorizontalNavigationDropdownMenuButtonBody
        isActive={false}
        ref={forwardRef}
        {...ButtonProps}
      >
        {children}
      </DesktopHorizontalNavigationDropdownMenuButtonBody>
    )
  }

  return (
    <NavLink
      passHref
      href={href}
      prefetch={false}
    >
      {({
        isActiveBasePath
      }) => (
        <Box as='a'>
          <DesktopHorizontalNavigationDropdownMenuButtonBody
            ref={forwardRef}
            isActive={isActiveBasePath}
            {...ButtonProps}
          >
            {children}
          </DesktopHorizontalNavigationDropdownMenuButtonBody>
        </Box>
      )}
    </NavLink>
  )
})

export default MobileHorizontalNavigationDropdownMenuButton
