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

  return (
    <Menu
      icon={
        <Icon
          icon={ShareExternalMedia}
          w={6}
          h={6}
          fill='whiteAlpha.700'
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
