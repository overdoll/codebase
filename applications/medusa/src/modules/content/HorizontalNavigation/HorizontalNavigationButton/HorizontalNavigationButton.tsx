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
  exact = false
}: Props): JSX.Element {
  return (
    <NavLink
      exact={exact}
      to={to}
    >
      {({ isActiveBasePath }) => (
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
              bg={isActiveBasePath ? 'gray.500' : 'transparent'}
              h={h ?? {
                base: '48px',
                md: '42px'
              }}
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
                      fill={isActiveBasePath ? 'gray.100' : 'gray.300'}
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
