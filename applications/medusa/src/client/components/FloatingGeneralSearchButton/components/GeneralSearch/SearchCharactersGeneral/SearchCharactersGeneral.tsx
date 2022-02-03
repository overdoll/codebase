import { graphql } from 'react-relay/hooks'
import type { SearchCharactersQuery } from '@//:artifacts/SearchCharactersQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { removeNode } from '@//:modules/support'
import {
  CharacterTileOverlay,
  GridTile,
  GridWrap,
  LoadMoreGridTile,
  Selector
} from '../../../../../../modules/content/ContentSelection'
import { Trans } from '@lingui/macro'
import { SearchCharactersGeneralFragment$key } from '@//:artifacts/SearchCharactersGeneralFragment.graphql'
import { useEffect } from 'react'

interface Props {
  selected: string[]
  onSelect: (category: any) => void
  query: SearchCharactersGeneralFragment$key
  onDataChange?: (data) => void
}

const SearchCharactersFragmentGQL = graphql`
  fragment SearchCharactersGeneralFragment on Query
  @argumentDefinitions(
    after: {type: String},
    search: {type: String}
  )
  @refetchable(queryName: "SearchCharactersGeneralPaginationFragment" )
  {
    characters (
      first: $first,
      after: $after,
      name: $search,
      slugs: $charactersSlugs
      seriesSlug: $charactersSeriesSlug
    ) @connection(key: "SearchCharactersGeneral_characters")
    {

      edges {
        node {
          id
          slug
          name
          ...CharacterTileOverlayFragment
        }
      }
    }
  }
`

export default function SearchCharactersGeneral ({
  onSelect,
  selected,
  query,
  onDataChange
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SearchCharactersQuery, any>(
    SearchCharactersFragmentGQL,
    query
  )

  const characters = removeNode(data.characters.edges)

  const onChangeSelection = (id): void => {
    const character = characters.filter((item) => item.id === id)[0]
    onSelect(character)
  }

  useEffect(() => {
    onDataChange?.(data)
  }, [data])

  if (characters.length < 1) {
    return <></>
  }

  return (
    <>
      <GridWrap justify='center'>
        {characters.map((item, index) => (
          <GridTile key={index}>
            <Selector
              onSelect={onChangeSelection}
              selected={selected}
              id={item.id}
            >
              <CharacterTileOverlay
                query={item}
              />
            </Selector>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          text={<Trans>Load More Characters</Trans>}
          hasNext={hasNext && characters.length > 0}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </>
  )
}
