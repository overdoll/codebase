import { Box, Flex, HTMLChakraProps, Tooltip } from '@chakra-ui/react'
import { Icon } from '../../index'
import { ClickableBox } from '../../PageLayout'
import { FunctionComponent, ReactNode } from 'react'
import NavLink from '../../../routing/NavLink'

interface Props extends HTMLChakraProps<any> {
  icon?: FunctionComponent<any>
  label: ReactNode
  exact?: boolean
  w?: string
  h?: string
  to: string
  onClick?: () => void
  colorScheme?: string
  children?: ReactNode
}

export default function HorizontalNavigationButton ({
  icon,
  label,
  onClick,
  children,
  w,
  h,
  as,
  to,
  exact = false,
  colorScheme = 'gray'
}: Props): JSX.Element {
  const fillColor = colorScheme === 'gray' ? 'gray.100' : `${colorScheme}.400`

  return (
    <NavLink
      exact={exact}
      to={to}
    >
      {({
        isActiveBasePath,
        isActive
      }) => (
        <Tooltip
          hasArrow
          label={label}
          placement='bottom'
        >
          <Box h='100%'>
            <ClickableBox
              onClick={onClick}
              borderRadius={{
                base: 2,
                md: 10
              }}
              bg={(exact ? isActive : isActiveBasePath) ? 'gray.500' : 'transparent'}
              h={h ?? '48px'}
              w={w ?? '58px'}
              as={as}
              p={0}
            >
              {(icon != null)
                ? (
                  <Flex justify='center' align='center' w='100%'>
                    <Icon
                      icon={icon}
                      p={2}
                      fill={(exact ? isActive : isActiveBasePath) ? fillColor : 'gray.300'}
                      h='38px'
                    />
                  </Flex>
                  )
                : children}
            </ClickableBox>
          </Box>
        </Tooltip>
      )}
    </NavLink>
  )
}
