import { Box, BoxProps } from '@chakra-ui/react'
import { Icon } from '../../../../../PageLayout'
import { IconType } from '@//:types/components'
import { IconProps } from '../../../../../PageLayout/Flair/Icon/Icon'

interface Props extends BoxProps {
  icon: IconType
  iconProps?: IconProps
}

export default function MediaButton (props: Props): JSX.Element {
  const {
    icon,
    iconProps,
    ...rest
  } = props

  return (
    <Box
      data-ignore='click'
      cursor='pointer'
      w={5}
      h={5}
      {...rest}
    >
      <Icon pointerEvents='none' icon={icon} fill='whiteAlpha.900' {...iconProps} />
    </Box>
  )
}
