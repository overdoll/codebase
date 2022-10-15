import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HeaderPublicClubCharacterFragment$key } from '@//:artifacts/HeaderPublicClubCharacterFragment.graphql'
import ClubCharacterRecommendations from './ClubCharacterRecommendations/ClubCharacterRecommendations'
import { Trans } from '@lingui/macro'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import SearchCustomCharacterCopyLinkButton
  from './SearchCustomCharacterCopyLinkButton/SearchCustomCharacterCopyLinkButton'
import SearchCustomCharacterShareDiscordButton
  from './SearchCustomCharacterShareDiscordButton/SearchCustomCharacterShareDiscordButton'
import SearchCustomCharacterShareRedditButton
  from './SearchCustomCharacterShareRedditButton/SearchCustomCharacterShareRedditButton'
import SearchCustomCharacterShareTwitterButton
  from './SearchCustomCharacterShareTwitterButton/SearchCustomCharacterShareTwitterButton'
import CharacterBanner from '@//:modules/content/PageLayout/Display/fragments/Banner/CharacterBanner/CharacterBanner'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import React from 'react'

interface Props {
  characterQuery: HeaderPublicClubCharacterFragment$key
}

const CharacterFragment = graphql`
  fragment HeaderPublicClubCharacterFragment on Character {
    club @required(action: THROW) {
      ...ClubCharacterRecommendationsFragment
    }
    name
    ...CharacterBannerFragment
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
      <TileOverlay backdrop={(
        <CharacterBanner characterQuery={characterData} />
      )}
      >
        <Stack minH={150} spacing={2} align='center' justify='center' px={2}>
          <Heading textAlign='center' fontSize='3xl' color='gray.00'>
            {characterData.name}
          </Heading>
          <Heading textAlign='center' fontSize='lg' color='gray.100'>
            <Trans>
              Club Character
            </Trans>
          </Heading>
        </Stack>
      </TileOverlay>
      <HStack justify='flex-end' spacing={1}>
        <SearchCustomCharacterCopyLinkButton query={characterData} />
        <SearchCustomCharacterShareDiscordButton query={characterData} />
        <SearchCustomCharacterShareRedditButton query={characterData} />
        <SearchCustomCharacterShareTwitterButton query={characterData} />
      </HStack>
    </Stack>
  )
}
