import { forwardRef, ReactNode, useContext } from 'react'
import { IconType } from '@//:types/components'
import type { UrlObject } from 'url'
import { HorizontalNavigationDropdownMenuContext } from '../../context'
import NavLink from '../../../../../../routing/NavLink'
import { Box } from '@chakra-ui/react'
import MobileHorizontalNavigationDropdownMenuButtonBody
  from './MobileHorizontalNavigationDropdownMenuButtonBody/MobileHorizontalNavigationDropdownMenuButtonBody'

interface Props {
  label?: ReactNode
  icon?: IconType
  to?: string
  onClick?: () => void
  children?: ReactNode
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
      <MobileHorizontalNavigationDropdownMenuButtonBody
        isActive={false}
        ref={forwardRef}
        {...ButtonProps}
      >
        {children}
      </MobileHorizontalNavigationDropdownMenuButtonBody>
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
          <MobileHorizontalNavigationDropdownMenuButtonBody
            ref={forwardRef}
            isActive={isActiveBasePath}
            {...ButtonProps}
          >
            {children}
          </MobileHorizontalNavigationDropdownMenuButtonBody>
        </Box>
      )}
    </NavLink>
  )
})

export default MobileHorizontalNavigationDropdownMenuButton
