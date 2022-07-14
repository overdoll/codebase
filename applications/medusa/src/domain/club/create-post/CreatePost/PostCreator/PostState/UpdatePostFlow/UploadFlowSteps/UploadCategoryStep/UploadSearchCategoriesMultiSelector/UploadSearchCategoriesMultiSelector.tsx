import { usePaginationFragment } from 'react-relay'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import type {
  UploadSearchCategoriesMultiSelectorQuery
} from '@//:artifacts/UploadSearchCategoriesMultiSelectorQuery.graphql'
import CategoryTileOverlay
  from '@//:modules/content/ContentSelection/TileOverlay/CategoryTileOverlay/CategoryTileOverlay'
import { EmptyBoundary, EmptyCategories } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import { Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import SuggestPrompt from '../../../../../../SuggestPrompt/SuggestPrompt'
import ShortGridWrap from '@//:modules/content/ContentSelection/ShortGridWrap/ShortGridWrap'
import ShortGridTile from '@//:modules/content/ContentSelection/ShortGridTile/ShortGridTile'

interface Props extends ComponentSearchArguments<any>, ComponentChoiceArguments<any> {
}

const Query = graphql`
  query UploadSearchCategoriesMultiSelectorQuery($title: String) {
    ...UploadSearchCategoriesMultiSelectorFragment @arguments(title: $title)
  }
`

const Fragment = graphql`
  fragment UploadSearchCategoriesMultiSelectorFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 10}
    after: {type: String},
    title: {type: String}
  )
  @refetchable(queryName: "UploadSearchCategoriesMultiSelectorPaginationFragment" )
  {
    categories (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "UploadSearchCategoriesMultiSelector_categories")
    {
      edges {
        node {
          id
          title
          ...CategoryTileOverlayFragment
        }
      }
    }
  }
`

export default function UploadSearchCategoriesMultiSelector ({
  searchArguments,
  register
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<UploadSearchCategoriesMultiSelectorQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<UploadSearchCategoriesMultiSelectorQuery, any>(
    Fragment,
    queryData
  )

  return (
    <EmptyBoundary
      fallback={(
        <Stack spacing={2}>
          <EmptyCategories hint={searchArguments.variables.title} />
          <SuggestPrompt>
            <Trans>
              Have a category suggestion? Send us an email at hello@overdoll.com!
            </Trans>
          </SuggestPrompt>
        </Stack>)}
      condition={data.categories.edges.length < 1}
    >
      <ShortGridWrap>
        {data.categories.edges.map((item, index) => (
          <ShortGridTile key={index}>
            <Choice
              {...register(item.node.id, {
                title: item.node.title
              })}
            >
              <CategoryTileOverlay query={item.node} />
            </Choice>
          </ShortGridTile>
        )
        )}
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(15)}
          isLoadingNext={isLoadingNext}
        />
      </ShortGridWrap>
    </EmptyBoundary>
  )
}
