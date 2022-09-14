import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HStack, Stack } from '@chakra-ui/react'
import SearchButton from '@//:common/components/PageHeader/SearchButton/SearchButton'
import type { HeaderPublicClubPostsFragment$key } from '@//:artifacts/HeaderPublicClubPostsFragment.graphql'
import ClubCharacterRecommendations
  from '../../../../../../../character/RootPublicClubCharacter/DisposePublicClubCharacter/ResultPublicClubCharacter/MetaPublicClubCharacter/ContainerPublicClubCharacter/HeaderPublicClubCharacter/ClubCharacterRecommendations/ClubCharacterRecommendations'
import ClubFooterCopyLinkButton
  from '../../../../../../../club/RootPublicClub/DisposePublicClub/ResultPublicClub/MetaPublicClub/ContainerPublicClub/HeaderPublicClub/ClubFooterButtons/ClubFooterCopyLinkButton/ClubFooterCopyLinkButton'
import ClubFooterShareDiscordButton
  from '../../../../../../../club/RootPublicClub/DisposePublicClub/ResultPublicClub/MetaPublicClub/ContainerPublicClub/HeaderPublicClub/ClubFooterButtons/ClubFooterShareDiscordButton/ClubFooterShareDiscordButton'
import ClubFooterShareRedditButton
  from '../../../../../../../club/RootPublicClub/DisposePublicClub/ResultPublicClub/MetaPublicClub/ContainerPublicClub/HeaderPublicClub/ClubFooterButtons/ClubFooterShareRedditButton/ClubFooterShareRedditButton'
import ClubFooterShareTwitterButton
  from '../../../../../../../club/RootPublicClub/DisposePublicClub/ResultPublicClub/MetaPublicClub/ContainerPublicClub/HeaderPublicClub/ClubFooterButtons/ClubFooterShareTwitterButton/ClubFooterShareTwitterButton'

interface Props {
  clubQuery: HeaderPublicClubPostsFragment$key
}

const ClubFragment = graphql`
  fragment HeaderPublicClubPostsFragment on Club {
    ...ClubCharacterRecommendationsFragment
    ...ClubFooterCopyLinkButtonFragment
    ...ClubFooterShareDiscordButtonFragment
    ...ClubFooterShareRedditButtonFragment
    ...ClubFooterShareTwitterButtonFragment
  }
`

export default function HeaderPublicClubPosts (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)

  return (
    <Stack spacing={2}>
      <ClubCharacterRecommendations query={clubData} />
      <HStack justify='space-between' mt={2} spacing={2}>
        <HStack spacing={1}>
          <ClubFooterCopyLinkButton query={clubData} />
          <ClubFooterShareDiscordButton query={clubData} />
          <ClubFooterShareRedditButton query={clubData} />
          <ClubFooterShareTwitterButton query={clubData} />
        </HStack>
        <SearchButton />
      </HStack>
    </Stack>
  )
}
