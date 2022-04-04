import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'

export default function EmptyGeneralSearch ({ hint }: HintProp): JSX.Element {
  const { i18n } = useLingui()

  return (
    <EmptyBackground>
      {i18n._(t`No categories, characters, or series were found${hint != null ? ` from the text ${hint}` : ''}`)}
    </EmptyBackground>
  )
}
