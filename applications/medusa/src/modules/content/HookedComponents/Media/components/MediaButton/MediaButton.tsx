import { Box, BoxProps } from '@chakra-ui/react'
import { Icon } from '../../../../PageLayout'
import { IconType } from '@//:types/components'

interface Props extends BoxProps {
  icon: IconType
}

export default function MediaButton (props: Props): JSX.Element {
  const {
    icon,
    ...rest
  } = props

  return (
    <Box
      cursor='pointer'
      w={6}
      h={6}
      boxShadow='lg'
      {...rest}
    >
      <Icon icon={icon} fill='whiteAlpha.900' />
    </Box>
  )
}
