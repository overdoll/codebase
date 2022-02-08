import NavLink from '../../../../routing/NavLink'
import { FunctionComponent, ReactNode, useContext } from 'react'
import { HorizontalNavigationDropdownMenuContext } from '../context'
import HorizontalNavigationDropdownMenuButtonBody
  from './HorizontalNavigationDropdownMenuButtonBody/HorizontalNavigationDropdownMenuButtonBody'

interface Props {
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

export default function HorizontalNavigationDropdownMenuButton ({
  label,
  icon,
  onClick,
  isDisabled,
  color,
  children,
  to,
  colorScheme,
  isActive = false
}: Props): JSX.Element {
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

  if (to == null) {
    return (
      <HorizontalNavigationDropdownMenuButtonBody
        isActive={isActive}
        {...ButtonProps}
      >
        {children}
      </HorizontalNavigationDropdownMenuButtonBody>
    )
  }

  return (
    <NavLink to={to}>
      {({ isActiveBasePath }) => (
        <HorizontalNavigationDropdownMenuButtonBody
          isActive={isActiveBasePath}
          {...ButtonProps}
        >
          {children}
        </HorizontalNavigationDropdownMenuButtonBody>
      )}
    </NavLink>
  )
}
