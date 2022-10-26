import { useLingui } from '@lingui/react'
import MediumGenericButton from '@//:common/components/GenericButtons/MediumGenericButton/MediumGenericButton'
import { t } from '@lingui/macro'

export default function ClubJoinOwnerButton (): JSX.Element {
  const { i18n } = useLingui()

  return (
    <MediumGenericButton
      colorScheme='gray'
      variant='outline'
    >
      {i18n._(t`Joined`)}
    </MediumGenericButton>
  )
}
