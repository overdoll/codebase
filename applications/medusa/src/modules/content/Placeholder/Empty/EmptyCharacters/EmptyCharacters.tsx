import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'

export default function EmptyCharacters ({ hint }: HintProp): JSX.Element {
  const { i18n } = useLingui()

  return (
    <EmptyBackground>
      {i18n._(t`No characters were found${hint != null ? ` with the name ${hint}` : ''}`)}
    </EmptyBackground>
  )
}
