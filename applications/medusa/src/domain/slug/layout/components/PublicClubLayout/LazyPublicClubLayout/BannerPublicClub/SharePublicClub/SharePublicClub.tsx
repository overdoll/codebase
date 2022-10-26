import { SharePublicClubFragment$key } from '@//:artifacts/SharePublicClubFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import ClubShareLinkButton from './ClubShareLinkButton/ClubShareLinkButton'
import ClubShareTwitterButton from './ClubShareTwitterButton/ClubShareTwitterButton'
import ClubShareDiscordButton from './ClubShareDiscordButton/ClubShareDiscordButton'
import ClubShareRedditButton from './ClubShareRedditButton/ClubShareRedditButton'
import { Icon } from '@//:modules/content/PageLayout'
import { ShareExternalMedia } from '@//:assets/icons'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

interface Props {
  clubQuery: SharePublicClubFragment$key
}

const ClubFragment = graphql`
  fragment SharePublicClubFragment on Club {
    ...ClubShareLinkButtonFragment
    ...ClubShareTwitterButtonFragment
    ...ClubShareDiscordButtonFragment
    ...ClubShareRedditButtonFragment
  }
`

export default function SharePublicClub (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)

  const { i18n } = useLingui()

  return (
    <Menu
      aria-label={i18n._(t`Share Menu`)}
      icon={
        <Icon
          icon={ShareExternalMedia}
          w={5}
          h={5}
          fill='whiteAlpha.800'
        />
      }
      size='md'
      variant='ghost'
    >
      <ClubShareLinkButton clubQuery={clubData} />
      <ClubShareTwitterButton query={clubData} />
      <ClubShareDiscordButton query={clubData} />
      <ClubShareRedditButton query={clubData} />
    </Menu>
  )
}
