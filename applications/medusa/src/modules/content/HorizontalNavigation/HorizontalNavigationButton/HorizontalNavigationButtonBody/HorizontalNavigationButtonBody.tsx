import { Box, Flex, HTMLChakraProps, Tooltip } from '@chakra-ui/react'
import { ClickableBox, Icon } from '../../../PageLayout'
import { FunctionComponent, ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  icon?: FunctionComponent<any>
  label: ReactNode
  onClick?: () => void
  colorScheme?: string
  children?: ReactNode
  isActive?: boolean
}

export default function HorizontalNavigationButtonBody ({
  icon,
  label,
  onClick,
  children,
  colorScheme = 'gray',
  isActive = false
}: Props): JSX.Element {
  const fillColor = colorScheme === 'gray' ? 'gray.100' : `${colorScheme}.400`

  return (
    <Tooltip
      hasArrow
      label={label}
      placement='bottom'
    >
      <Box>
        <ClickableBox
          onClick={onClick}
          borderRadius={{
            base: 2,
            md: 10
          }}
          bg={isActive ? 'gray.500' : 'transparent'}
          h='46px'
          w={{
            base: '58px',
            md: '48px'
          }}
          p={0}
        >
          {(icon != null)
            ? (
              <Flex justify='center' align='center' w='100%'>
                <Icon
                  icon={icon}
                  p={2}
                  fill={isActive ? fillColor : 'gray.300'}
                  h='38px'
                />
              </Flex>
              )
            : children}
        </ClickableBox>
      </Box>
    </Tooltip>
  )
}
