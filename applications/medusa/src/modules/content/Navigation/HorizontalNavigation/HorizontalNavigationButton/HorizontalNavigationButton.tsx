import { forwardRef, FunctionComponent, ReactNode } from 'react'
import NavLink from '../../../../routing/NavLink'
import HorizontalNavigationButtonBody from './HorizontalNavigationButtonBody/HorizontalNavigationButtonBody'
import { UrlObject } from 'url'
import { ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
  icon?: FunctionComponent<any>
  label: string
  exact?: boolean
  children?: ReactNode
  isActive?: boolean
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
      passHref
      href={href}
    >
      {({
        isActiveBasePath,
        isActive
      }) => {
        const determineActive = exact ? isActive : isActiveBasePath
        return (
          <HorizontalNavigationButtonBody
            as='a'
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
