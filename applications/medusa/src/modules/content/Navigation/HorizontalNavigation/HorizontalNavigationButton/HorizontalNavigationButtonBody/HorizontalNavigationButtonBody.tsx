import { Box, ButtonProps, Tooltip } from '@chakra-ui/react'
import { Icon } from '../../../../PageLayout'
import { forwardRef, ReactNode } from 'react'
import Button from '../../../../../form/Button/Button'
import IconButton from '../../../../../form/IconButton/IconButton'
import { IconType } from '@//:types/components'

interface Props extends ButtonProps {
  icon?: IconType
  label: ReactNode
  colorScheme?: string
  children?: ReactNode
  isActive?: boolean
}

const HorizontalNavigationButtonBody = forwardRef<any, Props>(({
  icon,
  label,
  onClick,
  children,
  colorScheme = 'gray',
  isActive = false,
  ...rest
}: Props, forwardRef): JSX.Element => {
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
    ref: forwardRef
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
          p={0}
          {...ButtonProps}
          {...rest}
        >
          {children}
        </Button>
      </ButtonWrapper>
    )
  }

  return (
    <ButtonWrapper>
      <IconButton
        aria-label={label as string}
        icon={<Icon
          icon={icon}
          p={2}
          fill={isActive ? fillColor : 'gray.300'}
          h='38px'
              />}
        {...ButtonProps}
        {...rest}
      />
    </ButtonWrapper>
  )
})

export default HorizontalNavigationButtonBody
