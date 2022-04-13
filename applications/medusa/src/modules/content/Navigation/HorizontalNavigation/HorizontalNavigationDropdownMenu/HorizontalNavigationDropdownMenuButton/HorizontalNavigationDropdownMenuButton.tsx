import NavLink from '../../../../../routing/NavLink'
import { forwardRef, FunctionComponent, ReactNode, useContext } from 'react'
import { HorizontalNavigationDropdownMenuContext } from '../context'
import HorizontalNavigationDropdownMenuButtonBody
  from './HorizontalNavigationDropdownMenuButtonBody/HorizontalNavigationDropdownMenuButtonBody'
import { LinkProps } from 'next/link'

interface Props extends LinkProps {
  label?: ReactNode
  icon?: FunctionComponent<any>
  to?: string
  onClick?: () => void
  isDisabled?: boolean
  color?: string
  children?: ReactNode
  colorScheme?: string
  isActive?: boolean
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
      href={href}
      {...rest}
    >
      {({
        isActiveBasePath
      }) => (
        <HorizontalNavigationDropdownMenuButtonBody
          ref={forwardRef}
          isActive={isActiveBasePath}
          {...ButtonProps}
        >
          {children}
        </HorizontalNavigationDropdownMenuButtonBody>
      )}
    </NavLink>
  )
})

export default HorizontalNavigationDropdownMenuButton
