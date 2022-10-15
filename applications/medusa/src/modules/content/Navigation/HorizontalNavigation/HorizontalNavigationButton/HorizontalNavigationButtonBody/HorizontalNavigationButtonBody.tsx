import { Box, ButtonProps, Tooltip } from '@chakra-ui/react'
import { Icon } from '../../../../PageLayout'
import { forwardRef, ReactNode } from 'react'
import IconButton from '../../../../../form/IconButton/IconButton'
import { IconType } from '@//:types/components'

interface Props extends ButtonProps {
  icon: IconType
  label: ReactNode
  colorScheme?: string
  children?: ReactNode
  isActive?: boolean
  hasBadge?: boolean
}

const HorizontalNavigationButtonBody = forwardRef<any, Props>((props: Props, forwardRef): JSX.Element => {
  const {
    icon,
    label,
    onClick,
    children,
    colorScheme = 'gray',
    isActive = false,
    hasBadge,
    ...rest
  } = props

  const fillColor = colorScheme === 'gray' ? 'gray.100' : `${colorScheme}.400`

  const ButtonProps = {
    borderRadius: {
      base: 2,
      md: 10
    },
    bg: isActive ? 'whiteAlpha.100' : 'transparent',
    h: '46px',
    w: {
      base: '58px',
      md: '48px'
    },
    onClick: onClick,
    ref: forwardRef
  }

  return (
    <Tooltip
      hasArrow
      label={label}
      placement='bottom'
    >
      <Box position='relative' pointerEvents='auto'>
        {children ??
          (
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
          )}
        {(hasBadge === true && !isActive) && (
          <Box
            w={2}
            h={2}
            top={2}
            right={2}
            borderRadius='full'
            bg={fillColor}
            position='absolute'
          />
        )}
      </Box>
    </Tooltip>
  )
})

export default HorizontalNavigationButtonBody
