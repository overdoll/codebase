import { ViewClubCharactersFragment$key } from '@//:artifacts/ViewClubCharactersFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import {
  CharacterTileOverlay,
  GridTile,
  GridWrap,
  LinkTile,
  LoadMoreGridTile
} from '@//:modules/content/ContentSelection'
import { Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ClubCharactersQuery } from '@//:artifacts/ClubCharactersQuery.graphql'
import { Icon } from '@//:modules/content/PageLayout'
import { AddPlus } from '@//:assets/icons'
import CharacterLinkTile from '../../../../../../../../common/components/CharacterLinkTile/CharacterLinkTile'

interface Props {
  query: ViewClubCharactersFragment$key
}

const Fragment = graphql`
  fragment ViewClubCharactersFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 8}
    after: {type: String}
  )
  @refetchable(queryName: "ClubCharactersPaginationQuery" ) {
    characters (first: $first, after: $after)
    @connection(key: "ClubCharacters_characters") {
      __id
      edges {
        node {
          id
          ...CharacterTileOverlayFragment
          ...CharacterLinkTileFragment
        }
      }
    }
    charactersCount
    charactersLimit
    slug
  }
`

export default function ViewClubCharacters ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<ClubCharactersQuery, any>(
    Fragment,
    query
  )

  const disabledCharacterCreation = data.charactersCount === data.charactersLimit

  return (
    <GridWrap>
      {!disabledCharacterCreation && (
        <GridTile>
          <LinkTile
            href={{
              pathname: '/club/[slug]/characters/create',
              query: {
                slug: data.slug
              }
            }}
          >
            <Stack spacing={3} borderRadius='md' w='100%' h='100%' align='center' bg='gray.800' justify='center'>
              <Icon icon={AddPlus} fill='gray.00' w={4} h={4} />
              <Heading fontSize='sm' color='gray.00' textAlign='center'>
                <Trans>
                  Create Character
                </Trans>
              </Heading>
            </Stack>
          </LinkTile>
        </GridTile>
      )}
      {data.characters.edges.map((item) => (
        <GridTile key={item.node.id}>
          <CharacterLinkTile query={item.node}>
            <CharacterTileOverlay query={item.node} />
          </CharacterLinkTile>
        </GridTile>
      )
      )}
      <LoadMoreGridTile
        hasNext={hasNext}
        onLoadNext={() => loadNext(5)}
        isLoadingNext={isLoadingNext}
      />
    </GridWrap>
  )
}
