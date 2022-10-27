import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type {
  UploadSearchOriginalCharactersMultiSelectorQuery
} from '@//:artifacts/UploadSearchOriginalCharactersMultiSelectorQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { CharacterTileOverlay, GridTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import MediumGridWrap from '@//:modules/content/ContentSelection/MediumGridWrap/MediumGridWrap'
import EmptyCustomCharacters from '@//:modules/content/Placeholder/Empty/EmptyCustomCharacters/EmptyCustomCharacters'
import { Stack } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Trans } from '@lingui/macro'

interface Props extends ComponentChoiceArguments<any>, ComponentSearchArguments<any> {
}

const Query = graphql`
  query UploadSearchOriginalCharactersMultiSelectorQuery($name: String, $slug: String!) {
    club(slug: $slug) {
      slug
      ...UploadSearchOriginalCharactersMultiSelectorFragment @arguments(name: $name)
    }
  }
`

const Fragment = graphql`
  fragment UploadSearchOriginalCharactersMultiSelectorFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 14}
    after: {type: String},
    name: {type: String}
  )
  @refetchable(queryName: "UploadSearchOriginalCharactersMultiSelectorPaginationFragment" )
  {
    characters (
      first: $first,
      after: $after,
      name: $name,
    ) @connection(key: "UploadSearchOriginalCharactersMultiSelector_characters")
    {
      edges {
        node {
          id
          name
          ...CharacterTileOverlayFragment
        }
      }
    }
    slug
  }
`

export default function UploadSearchOriginalCharactersMultiSelector (props: Props): JSX.Element {
  const {
    searchArguments,
    register
  } = props

  const queryData = useLazyLoadQuery<UploadSearchOriginalCharactersMultiSelectorQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<UploadSearchOriginalCharactersMultiSelectorQuery, any>(
    Fragment,
    queryData.club
  )

  return (
    <EmptyBoundary
      fallback={(
        <Stack spacing={2}>
          <EmptyCustomCharacters hint={searchArguments.variables.name} />
          <LinkButton
            w='100%'
            href={{
              pathname: '/club/[slug]/characters',
              query: {
                slug: data.slug
              }
            }}
          >
            <Trans>
              Create an original character
            </Trans>
          </LinkButton>
        </Stack>
      )}
      condition={data.characters.edges.length < 1}
    >
      <MediumGridWrap>
        {data.characters.edges.map((item) => (
          <GridTile key={item.node.id}>
            <Choice {...register(item.node.id, { name: item.node.name })}>
              <CharacterTileOverlay query={item.node} />
            </Choice>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </MediumGridWrap>
    </EmptyBoundary>
  )
}
