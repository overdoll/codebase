import { forwardRef } from 'react'
import { IconButtonProps } from '@chakra-ui/react'
import IconButton from '../../../form/IconButton/IconButton'
import { Icon } from '../../PageLayout'
import { RemoveCross } from '@//:assets/icons'
import { ForwardRefProp } from '@//:types/components'

type Props = Omit<IconButtonProps, 'aria-label'> & ForwardRefProp

const CloseButton = forwardRef<any, Props>(({
  size = 'sm',
  color = 'whiteAlpha.700',
  ...rest
}: Props, forwardRef) => {
  return (
    <IconButton
      aria-label='Close'
      variant='ghost'
      size={size}
      icon={<Icon
        fill={color as string}
        h='1em'
        w='1em'
        icon={RemoveCross}
            />}
      ref={forwardRef}
      {...rest}
    />
  )
})

export default CloseButton
