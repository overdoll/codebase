import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { forwardRef } from 'react'
import { ButtonProps } from '@chakra-ui/react'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useLingui } from '@lingui/react'
import { AddPlus } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'

interface Props extends ButtonProps {
  isIcon?: boolean
}

const ClubJoinButton = forwardRef<any, Props>(({
  isIcon = false,
  ...rest
}: Props, forwardRef): JSX.Element => {
  const { i18n } = useLingui()

  const BUTTON_PROPS = {
    colorScheme: 'primary',
    variant: 'solid'
  }

  if (isIcon) {
    return (
      <IconButton
        icon={<Icon icon={AddPlus} h={4} w={4} fill='gray.00' />}
        aria-label={i18n._(t`Join`)}
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
        Join
      </Trans>
    </Button>
  )
})

export default ClubJoinButton
