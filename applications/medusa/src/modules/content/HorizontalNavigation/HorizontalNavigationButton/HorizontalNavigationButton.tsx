import { Box, HTMLChakraProps, Tooltip } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { ClickableBox } from '@//:modules/content/PageLayout'
import { FunctionComponent, ReactNode } from 'react'
import NavLink from '../../../routing/NavLink'

interface Props extends HTMLChakraProps<any> {
  icon?: FunctionComponent<any>
  label: string
  exact?: boolean
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
              p={0}
              onClick={onClick}
              borderRadius={{
                base: 2,
                md: 10
              }}
              aria-label={label}
              bg={isActiveBasePath ? 'gray.500' : 'transparent'}
              h={h ?? {
                base: '48px',
                md: '42px'
              }}
              as={as}
            >
              {(icon != null)
                ? (
                  <Icon
                    icon={icon}
                    w={w ?? '58px'}
                    h='38px'
                    p={2}
                    fill={isActiveBasePath ? 'gray.100' : 'gray.300'}
                  />
                  )
                : children}
            </ClickableBox>
          </Box>
        </Tooltip>
      )}
    </NavLink>
  )
}
