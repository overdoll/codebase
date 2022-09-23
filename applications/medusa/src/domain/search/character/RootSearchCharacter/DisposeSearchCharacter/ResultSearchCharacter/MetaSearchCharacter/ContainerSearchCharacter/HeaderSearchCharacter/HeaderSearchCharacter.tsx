import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HeaderSearchCharacterFragment$key } from '@//:artifacts/HeaderSearchCharacterFragment.graphql'
import SearchSummary from '@//:common/components/PageHeader/SearchSummary/SearchSummary'
import { Trans } from '@lingui/macro'
import { HStack, Stack } from '@chakra-ui/react'
import SearchButton from '@//:common/components/PageHeader/SearchButton/SearchButton'
import SearchCharacterRecommendations from './SearchCharacterRecommendations/SearchCharacterRecommendations'
import SearchCharacterCopyLinkButton from './SearchCharacterCopyLinkButton/SearchCharacterCopyLinkButton'
import SearchCharacterShareDiscordButton from './SearchCharacterShareDiscordButton/SearchCharacterShareDiscordButton'
import SearchCharacterShareRedditButton from './SearchCharacterShareRedditButton/SearchCharacterShareRedditButton'
import SearchCharacterShareTwitterButton from './SearchCharacterShareTwitterButton/SearchCharacterShareTwitterButton'

interface Props {
  characterQuery: HeaderSearchCharacterFragment$key
}

const CharacterFragment = graphql`
  fragment HeaderSearchCharacterFragment on Character {
    name
    totalLikes
    totalPosts
    ...SearchCharacterRecommendationsFragment
    ...SearchCharacterCopyLinkButtonFragment
    ...SearchCharacterShareDiscordButtonFragment
    ...SearchCharacterShareRedditButtonFragment
    ...SearchCharacterShareTwitterButtonFragment
  }
`

export default function HeaderSearchCharacter (props: Props): JSX.Element {
  const {
    characterQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)

  return (
    <Stack spacing={2}>
      <SearchSummary
        title={characterData.name}
        type={<Trans>Character</Trans>}
        totalPosts={characterData.totalPosts}
        totalLikes={characterData.totalLikes}
      />
      <SearchCharacterRecommendations query={characterData} />
      <HStack justify='space-between' spacing={2}>
        <HStack spacing={1}>
          <SearchCharacterCopyLinkButton query={characterData} />
          <SearchCharacterShareDiscordButton query={characterData} />
          <SearchCharacterShareRedditButton query={characterData} />
          <SearchCharacterShareTwitterButton query={characterData} />
        </HStack>
        <SearchButton />
      </HStack>
    </Stack>
  )
}
