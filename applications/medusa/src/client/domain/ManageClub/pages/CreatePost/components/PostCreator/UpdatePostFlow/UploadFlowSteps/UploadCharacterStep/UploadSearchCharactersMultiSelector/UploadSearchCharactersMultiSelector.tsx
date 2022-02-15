import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type {
  UploadSearchCharactersMultiSelectorQuery
} from '@//:artifacts/UploadSearchCharactersMultiSelectorQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { removeNode } from '@//:modules/support'
import { Flex, Text } from '@chakra-ui/react'
import {
  CharacterTileOverlay,
  GridTile,
  GridWrap,
  LoadMoreGridTile,
  MultiSelectedValue,
  MultiSelectedValueFunction,
  MultiSelector
} from '@//:modules/content/ContentSelection'
import { Trans } from '@lingui/macro'
import { QueryArguments } from '@//:types/hooks'
import { EmptyCharacters } from '@//:modules/content/Placeholder'

interface Props {
  selected: MultiSelectedValue
  onSelect: MultiSelectedValueFunction
  queryArgs: QueryArguments
}

const Query = graphql`
  query UploadSearchCharactersMultiSelectorQuery($name: String) {
    ...UploadSearchCharactersMultiSelectorFragment @arguments(name: $name)
  }
`

const Fragment = graphql`
  fragment UploadSearchCharactersMultiSelectorFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String},
    name: {type: String}
  )
  @refetchable(queryName: "UploadSearchCharactersMultiSelectorPaginationFragment" )
  {
    characters (
      first: $first,
      after: $after,
      name: $name
    ) @connection(key: "UploadSearchCharactersMultiSelector_characters")
    {
      edges {
        node {
          id
          name
          ...CharacterTileOverlayFragment
        }
      }
    }
  }
`

export default function UploadSearchCharactersMultiSelector ({
  onSelect,
  selected,
  queryArgs
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<UploadSearchCharactersMultiSelectorQuery>(
    Query,
    queryArgs.variables,
    queryArgs.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<UploadSearchCharactersMultiSelectorQuery, any>(
    Fragment,
    queryData
  )

  const characters = removeNode(data.characters.edges)

  if (characters.length < 1) {
    return (
      <EmptyCharacters hint={queryArgs.variables.name} />
    )
  }

  return (
    <>
      <GridWrap justify='center'>
        {characters.map((item, index) => (
          <GridTile key={index}>
            <MultiSelector
              id={item.id}
              selected={selected}
              name={item.name}
              onSelect={onSelect}
            >
              <CharacterTileOverlay query={item} />
            </MultiSelector>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </>
  )
}
