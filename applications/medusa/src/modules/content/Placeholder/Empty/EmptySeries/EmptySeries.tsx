import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'

export default function EmptySeries ({ hint }: HintProp): JSX.Element {
  const { i18n } = useLingui()

  return (
    <EmptyBackground>
      {i18n._(t`No series were found${hint != null ? ` with the title ${hint}` : ''}`)}
    </EmptyBackground>
  )
}
