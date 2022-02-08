import { HTMLChakraProps } from '@chakra-ui/react'
import { ForwardedRef, FunctionComponent, ReactNode } from 'react'
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
  as?: any
  forwardRef?: ForwardedRef<any>
}

export default function HorizontalNavigationButton ({
  icon,
  label,
  onClick,
  children,
  to,
  exact = false,
  colorScheme = 'gray',
  isActive = false,
  as,
  ...rest
}: Props, forwardRef): JSX.Element {
  const ButtonProps = {
    icon,
    label,
    onClick,
    colorScheme,
    as,
    forwardRef: forwardRef,
    ...rest
  }

  if (to == null) {
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
      exact={exact}
      to={to}
    >
      {({
        isActiveBasePath,
        isActive,
        isPending
      }) => {
        const determineActive = exact ? isActive : isActiveBasePath
        return (
          <HorizontalNavigationButtonBody
            isPending={isPending}
            isActive={determineActive}
            {...ButtonProps}
          >
            {children}
          </HorizontalNavigationButtonBody>
        )
      }}
    </NavLink>
  )
}
