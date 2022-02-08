import { Box, HTMLChakraProps, Tooltip } from '@chakra-ui/react'
import { Icon } from '../../../PageLayout'
import { FunctionComponent, ReactNode } from 'react'
import Button from '../../../../form/Button/Button'
import IconButton from '../../../../form/IconButton/IconButton'

interface Props extends HTMLChakraProps<any> {
  icon?: FunctionComponent<any>
  label: ReactNode
  onClick?: () => void
  colorScheme?: string
  children?: ReactNode
  isActive?: boolean
  as?: any
  isPending?: boolean | undefined
}

export default function HorizontalNavigationButtonBody ({
  icon,
  label,
  onClick,
  children,
  colorScheme = 'gray',
  isActive = false,
  as,
  isPending
}: Props): JSX.Element {
  const fillColor = colorScheme === 'gray' ? 'gray.100' : `${colorScheme}.400`

  const ButtonProps = {
    borderRadius: {
      base: 2,
      md: 10
    },
    bg: isActive ? 'gray.500' : 'transparent',
    h: '46px',
    w: {
      base: '58px',
      md: '48px'
    },
    onClick: onClick,
    isLoading: isPending
  }

  const ButtonWrapper = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
      <Tooltip
        hasArrow
        label={label}
        placement='bottom'
      >
        <Box pointerEvents='auto'>
          {children}
        </Box>
      </Tooltip>
    )
  }

  if (icon == null) {
    return (
      <ButtonWrapper>
        <Button
          as={as}
          p={0}
          {...ButtonProps}
        >
          {children}
        </Button>
      </ButtonWrapper>
    )
  }

  return (
    <ButtonWrapper>
      <IconButton
        as={as}
        aria-label={label as string}
        icon={<Icon
          icon={icon}
          p={2}
          fill={isActive ? fillColor : 'gray.300'}
          h='38px'
              />}
        {...ButtonProps}
      />
    </ButtonWrapper>
  )
}
