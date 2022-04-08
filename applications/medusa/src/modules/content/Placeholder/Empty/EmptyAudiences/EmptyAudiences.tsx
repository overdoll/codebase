import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'

export default function EmptyAudiences ({ hint }: HintProp): JSX.Element {
  const { i18n } = useLingui()

  return (
    <EmptyBackground>
      {i18n._(t`No audiences were found${hint != null ? ` with the title ${hint}` : ''}`)}
    </EmptyBackground>
  )
}
