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

  if (to == null) {
    return (
      <HorizontalNavigationDropdownMenuButtonBody
        icon={icon}
        color={color}
        label={label}
        onClick={onClickMenu}
        isDisabled={isDisabled}
        isActive={isActive}
        colorScheme={colorScheme}
      >
        {children}
      </HorizontalNavigationDropdownMenuButtonBody>
    )
  }

  return (
    <NavLink to={to}>
      {({ isActiveBasePath }) => (
        <HorizontalNavigationDropdownMenuButtonBody
          icon={icon}
          color={color}
          label={label}
          onClick={onClickMenu}
          isDisabled={isDisabled}
          isActive={isActiveBasePath}
          colorScheme={colorScheme}
        >
          {children}
        </HorizontalNavigationDropdownMenuButtonBody>
      )}
    </NavLink>
  )
}
