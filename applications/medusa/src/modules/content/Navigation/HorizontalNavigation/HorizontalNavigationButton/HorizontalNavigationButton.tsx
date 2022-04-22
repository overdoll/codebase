import { forwardRef, FunctionComponent, ReactNode } from 'react'
import NavLink from '../../../../routing/NavLink'
import HorizontalNavigationButtonBody from './HorizontalNavigationButtonBody/HorizontalNavigationButtonBody'
import { UrlObject } from 'url'

interface Props {
  icon?: FunctionComponent<any>
  label: ReactNode
  exact?: boolean
  onClick?: () => void
  colorScheme?: string
  children?: ReactNode
  isActive?: boolean
  as?: any
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
    as,
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
      href={href}
    >
      {({
        isActiveBasePath,
        isActive
      }) => {
        const determineActive = exact ? isActive : isActiveBasePath
        return (
          <HorizontalNavigationButtonBody
            isActive={determineActive}
            {...ButtonProps}
          >
            {children}
          </HorizontalNavigationButtonBody>
        )
      }}
    </NavLink>
  )
})

export default HorizontalNavigationButton
