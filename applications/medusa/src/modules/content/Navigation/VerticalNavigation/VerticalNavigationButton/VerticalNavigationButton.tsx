import { FunctionComponent, ReactNode } from 'react'
import NavLink from '../../../../routing/NavLink'
import VerticalNavigationButtonBody from './VerticalNavigationButtonBody/VerticalNavigationButtonBody'
import { LinkProps } from 'next/link'
import { Box } from '@chakra-ui/react'

interface Props extends LinkProps {
  title: ReactNode
  icon?: FunctionComponent<any> | undefined
  colorScheme?: string
  buttonType?: 'primary' | 'secondary'
  isExternal?: boolean
}

export default function VerticalNavigationButton ({
  title,
  icon,
  colorScheme = 'gray',
  buttonType = 'secondary',
  isExternal = false,
  href,
  ...rest
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
      passHref
      href={href}
      {...rest}
    >
      {({
        isActiveBasePath
      }) => (
        <Box as='a'>
          <VerticalNavigationButtonBody
            isActive={isActiveBasePath}
            {...ButtonProps}
          />
        </Box>
      )}
    </NavLink>
  )
}
