import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { ClubPeopleGroup } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

export default function EmptyClubs ({ hint }: HintProp): JSX.Element {
  return (
    <EmptyBackground icon={ClubPeopleGroup}>
      {hint == null
        ? (
          <Trans>
            No clubs were found
          </Trans>
          )
        : (
          <Trans>
            No clubs were found with the name {hint}
          </Trans>
          )}
    </EmptyBackground>
  )
}
