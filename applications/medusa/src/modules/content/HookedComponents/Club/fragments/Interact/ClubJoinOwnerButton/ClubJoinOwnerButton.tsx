import { useLingui } from '@lingui/react'
import MediumGenericButton from '@//:common/components/GenericButtons/MediumGenericButton/MediumGenericButton'
import { t } from '@lingui/macro'
import { PlusCircle } from '@//:assets/icons'

export default function ClubJoinOwnerButton (): JSX.Element {
  const { i18n } = useLingui()

  return (
    <MediumGenericButton icon={PlusCircle} colorScheme='primary'>
      {i18n._(t`Joined`)}
    </MediumGenericButton>
  )
}
