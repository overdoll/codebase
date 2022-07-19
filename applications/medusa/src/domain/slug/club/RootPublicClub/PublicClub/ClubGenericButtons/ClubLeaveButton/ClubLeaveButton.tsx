import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { forwardRef } from 'react'
import { ButtonProps } from '@chakra-ui/react'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useLingui } from '@lingui/react'
import { RemoveCross } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'

interface Props extends ButtonProps {
  isIcon?: boolean
}

const ClubLeaveButton = forwardRef<any, Props>(({
  isIcon = false,
  ...rest
}: Props, forwardRef): JSX.Element => {
  const { i18n } = useLingui()

  const BUTTON_PROPS = {
    colorScheme: 'gray',
    variant: 'solid'
  }

  if (isIcon) {
    return (
      <IconButton
        icon={<Icon icon={RemoveCross} h={4} w={4} fill='gray.00' />}
        aria-label={i18n._(t`Leave`)}
        ref={forwardRef}
        {...BUTTON_PROPS}
        {...rest}
      />
    )
  }

  return (
    <Button
      ref={forwardRef}
      {...BUTTON_PROPS}
      {...rest}
    >
      <Trans>
        Leave
      </Trans>
    </Button>
  )
})

export default ClubLeaveButton
