import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import {
  SelectSeriesSearchQuery,
  SelectSeriesSearchQuery$variables
} from '@//:artifacts/SelectSeriesSearchQuery.graphql'
import removeNode from '@//:modules/support/removeNode'
import { GridTile, GridWrap, LoadMoreGridTile, SeriesTileOverlay } from '../../../../../../../ContentSelection'
import { EmptyBoundary, EmptySeries } from '../../../../../../../Placeholder'
import { Choice } from '../../../../../../Choice'
import { ComponentSearchArguments } from '../../../../../../Search/types'
import { ComponentChoiceArguments } from '../../../../../../Choice/types'

type Props = ComponentSearchArguments<SelectSeriesSearchQuery$variables> & ComponentChoiceArguments<any>

const Query = graphql`
  query SelectSeriesSearchQuery($title: String) {
    ...SelectSeriesSearchFragment
  }
`

const Fragment = graphql`
  fragment SelectSeriesSearchFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "SelectSeriesSearchPaginationFragment" )
  {
    series (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "StaffSeriesConnection_series")
    {
      edges {
        node {
          id
          title
          ...SeriesTileOverlayFragment
        }
      }
    }
  }
`
export default function SelectSeriesSearch ({
  searchArguments,
  register
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<SelectSeriesSearchQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SelectSeriesSearchQuery, any>(
    Fragment,
    queryData
  )
  const series = removeNode(data.series.edges)

  return (
    <EmptyBoundary
      fallback={<EmptySeries hint={searchArguments.variables.title} />}
      condition={series.length < 1}
    >
      <GridWrap>
        {series.map((item) => (
          <GridTile key={item.id}>
            <Choice
              {...register(item.id, { title: item.title })}
            >
              <SeriesTileOverlay query={item} />
            </Choice>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </EmptyBoundary>
  )
}
