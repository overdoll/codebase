import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HeaderSearchCharacterFragment$key } from '@//:artifacts/HeaderSearchCharacterFragment.graphql'
import { Trans } from '@lingui/macro'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import SearchCharacterCopyLinkButton from './SearchCharacterCopyLinkButton/SearchCharacterCopyLinkButton'
import SearchCharacterShareDiscordButton from './SearchCharacterShareDiscordButton/SearchCharacterShareDiscordButton'
import SearchCharacterShareRedditButton from './SearchCharacterShareRedditButton/SearchCharacterShareRedditButton'
import SearchCharacterShareTwitterButton from './SearchCharacterShareTwitterButton/SearchCharacterShareTwitterButton'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import CharacterBanner from '@//:modules/content/PageLayout/Display/fragments/Banner/CharacterBanner/CharacterBanner'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Icon } from '@//:modules/content/PageLayout'
import { ArrowButtonRight } from '@//:assets/icons'
import React from 'react'

interface Props {
  characterQuery: HeaderSearchCharacterFragment$key
}

const CharacterFragment = graphql`
  fragment HeaderSearchCharacterFragment on Character {
    name
    series {
      title
      slug
    }
    ...CharacterBannerFragment
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
              Character
            </Trans>
          </Heading>
          <LinkButton
            variant='ghost'
            rightIcon={<Icon icon={ArrowButtonRight} fill='gray.100' w={3} h={3} />}
            href={{
              pathname: '/search/series/[seriesSlug]',
              query: {
                seriesSlug: characterData.series?.slug
              }
            }}
          >
            {characterData.series?.title}
          </LinkButton>
        </Stack>
      </TileOverlay>
      <HStack justify='flex-end' spacing={1}>
        <SearchCharacterCopyLinkButton query={characterData} />
        <SearchCharacterShareDiscordButton query={characterData} />
        <SearchCharacterShareRedditButton query={characterData} />
        <SearchCharacterShareTwitterButton query={characterData} />
      </HStack>
    </Stack>
  )
}
