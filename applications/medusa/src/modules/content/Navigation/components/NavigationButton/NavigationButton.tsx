import { Box, HTMLChakraProps, Tooltip } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { ClickableBox } from '@//:modules/content/PageLayout'
import { FunctionComponent, ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  icon?: FunctionComponent<any>
  label: string
  active: boolean
  onClick?: () => void
  children?: ReactNode
}

export default function NavigationButton ({
  icon,
  label,
  active,
  onClick,
  children,
  w,
  h,
  as
}: Props): JSX.Element {
  return (
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
          bg={active ? 'gray.500' : 'transparent'}
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
                fill={active ? 'gray.100' : 'gray.300'}
              />
              )
            : children}
        </ClickableBox>
      </Box>
    </Tooltip>
  )
}
