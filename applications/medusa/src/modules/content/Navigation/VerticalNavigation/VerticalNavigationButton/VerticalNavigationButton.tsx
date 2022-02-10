import { FunctionComponent, ReactNode } from 'react'
import NavLink from '../../../../routing/NavLink'
import VerticalNavigationButtonBody from './VerticalNavigationButtonBody/VerticalNavigationButtonBody'

interface Props {
  title: ReactNode
  to: string
  exact?: boolean
  icon: FunctionComponent<any>
  colorScheme?: string
  strict?: boolean
  buttonType?: 'primary' | 'secondary'
  isExternal?: boolean
}

export default function VerticalNavigationButton ({
  title,
  icon,
  exact = false,
  strict = false,
  to,
  colorScheme = 'gray',
  buttonType = 'secondary',
  isExternal = false
}: Props): JSX.Element {
  const ButtonProps = {
    title,
    icon,
    colorScheme,
    buttonType,
    isExternal
  }

  return (
    <NavLink
      exact={exact}
      to={to}
      strict={strict}
    >
      {({
        isActive,
        isPending
      }) => (
        <VerticalNavigationButtonBody
          isActive={isActive}
          isPending={isPending}
          {...ButtonProps}
        />
      )}
    </NavLink>
  )
}
