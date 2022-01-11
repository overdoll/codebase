import { HTMLChakraProps } from '@chakra-ui/react'
import { FunctionComponent, ReactNode } from 'react'
import NavLink from '../../../routing/NavLink'
import HorizontalNavigationButtonBody from './HorizontalNavigationButtonBody/HorizontalNavigationButtonBody'

interface Props extends HTMLChakraProps<any> {
  icon?: FunctionComponent<any>
  label: ReactNode
  exact?: boolean
  to?: string | undefined
  onClick?: () => void
  colorScheme?: string
  children?: ReactNode
  isActive?: boolean
}

export default function HorizontalNavigationButton ({
  icon,
  label,
  onClick,
  children,
  to,
  exact = false,
  colorScheme = 'gray',
  isActive = false
}: Props): JSX.Element {
  if (to == null) {
    return (
      <HorizontalNavigationButtonBody
        icon={icon}
        label={label}
        isActive={isActive}
        onClick={onClick}
        colorScheme={colorScheme}
      >{children}
      </HorizontalNavigationButtonBody>
    )
  }

  return (
    <NavLink
      exact={exact}
      to={to}
    >
      {({
        isActiveBasePath,
        isActive
      }) => {
        const determineActive = exact ? isActive : isActiveBasePath
        return (
          <HorizontalNavigationButtonBody
            icon={icon}
            label={label}
            isActive={determineActive}
            onClick={onClick}
            colorScheme={colorScheme}
          >{children}
          </HorizontalNavigationButtonBody>
        )
      }}
    </NavLink>
  )
}
