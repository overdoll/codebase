import { forwardRef } from 'react'
import { CloseButtonProps } from '@chakra-ui/react'
import IconButton from '../../../form/IconButton/IconButton'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Icon } from '../../PageLayout'
import { RemoveCross } from '@//:assets/icons'
import { ForwardRefProp } from '@//:types/components'

interface Props extends CloseButtonProps, ForwardRefProp {

}

const CloseButton = forwardRef<any, Props>(({
  size = 'sm',
  ...rest
}: Props, forwardRef) => {
  const { i18n } = useLingui()

  return (
    <IconButton
      variant='ghost'
      size={size}
      borderRadius='xl'
      icon={<Icon fill='whiteAlpha.700' h='100%' w='100%' icon={RemoveCross} p={size === 'sm' ? 1 : 3} />}
      ref={forwardRef}
      aria-label={i18n._(t`Close`)}
      {...rest}
    />
  )
})

export default CloseButton
