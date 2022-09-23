import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HeaderPublicClubCharacterFragment$key } from '@//:artifacts/HeaderPublicClubCharacterFragment.graphql'
import ClubCharacterRecommendations from './ClubCharacterRecommendations/ClubCharacterRecommendations'
import SearchSummary from '@//:common/components/PageHeader/SearchSummary/SearchSummary'
import { Trans } from '@lingui/macro'
import { HStack, Stack } from '@chakra-ui/react'
import SearchCustomCharacterCopyLinkButton
  from './SearchCustomCharacterCopyLinkButton/SearchCustomCharacterCopyLinkButton'
import SearchCustomCharacterShareDiscordButton
  from './SearchCustomCharacterShareDiscordButton/SearchCustomCharacterShareDiscordButton'
import SearchCustomCharacterShareRedditButton
  from './SearchCustomCharacterShareRedditButton/SearchCustomCharacterShareRedditButton'
import SearchCustomCharacterShareTwitterButton
  from './SearchCustomCharacterShareTwitterButton/SearchCustomCharacterShareTwitterButton'
import SearchButton from '@//:common/components/PageHeader/SearchButton/SearchButton'

interface Props {
  characterQuery: HeaderPublicClubCharacterFragment$key
}

const CharacterFragment = graphql`
  fragment HeaderPublicClubCharacterFragment on Character {
    club @required(action: THROW) {
      ...ClubCharacterRecommendationsFragment
    }
    name
    totalLikes
    totalPosts
    ...SearchCustomCharacterCopyLinkButtonFragment
    ...SearchCustomCharacterShareDiscordButtonFragment
    ...SearchCustomCharacterShareRedditButtonFragment
    ...SearchCustomCharacterShareTwitterButtonFragment
  }
`

export default function HeaderPublicClubCharacter (props: Props): JSX.Element {
  const {
    characterQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)

  return (
    <Stack spacing={2}>
      <ClubCharacterRecommendations query={characterData.club} />
      <SearchSummary
        title={characterData.name}
        type={<Trans>Club Character</Trans>}
        totalPosts={characterData.totalPosts}
        totalLikes={characterData.totalLikes}
      />
      <HStack justify='space-between' spacing={2}>
        <HStack spacing={1}>
          <SearchCustomCharacterCopyLinkButton query={characterData} />
          <SearchCustomCharacterShareDiscordButton query={characterData} />
          <SearchCustomCharacterShareRedditButton query={characterData} />
          <SearchCustomCharacterShareTwitterButton query={characterData} />
        </HStack>
        <SearchButton />
      </HStack>
    </Stack>
  )
}
