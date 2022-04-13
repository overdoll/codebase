import { forwardRef } from 'react'
import { CloseButtonProps } from '@chakra-ui/react'
import IconButton from '../../../form/IconButton/IconButton'
import { Icon } from '../../PageLayout'
import { RemoveCross } from '@//:assets/icons'
import { ForwardRefProp } from '../../../../types/components'

type Props = CloseButtonProps & ForwardRefProp

const CloseButton = forwardRef<any, Props>(({
  size = 'sm',
  color = 'whiteAlpha.700',
  ...rest
}: Props, forwardRef) => {
  return (
    <IconButton
      variant='ghost'
      size={size}
      borderRadius='xl'
      icon={<Icon
        fill={color as string}
        h='1em'
        w='1em'
        icon={RemoveCross}
            />}
      ref={forwardRef}
      aria-label='Close'
      {...rest}
    />
  )
})

export default CloseButton
