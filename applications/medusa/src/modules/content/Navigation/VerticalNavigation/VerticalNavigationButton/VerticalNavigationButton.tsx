import { FunctionComponent, ReactNode } from 'react'
import NavLink from '../../../../routing/NavLink'
import VerticalNavigationButtonBody from './VerticalNavigationButtonBody/VerticalNavigationButtonBody'

interface Props {
  title: ReactNode
  to: string
  icon?: FunctionComponent<any> | undefined
  colorScheme?: string
  buttonType?: 'primary' | 'secondary'
  isExternal?: boolean
}

export default function VerticalNavigationButton ({
  title,
  icon,
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
      to={to}
    >
      {({
        isPending,
        isActiveBasePath
      }) => (
        <VerticalNavigationButtonBody
          isActive={isActiveBasePath}
          isPending={isPending}
          {...ButtonProps}
        />
      )}
    </NavLink>
  )
}
