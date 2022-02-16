import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { SelectSeriesSearchQuery } from '@//:artifacts/SelectSeriesSearchQuery.graphql'
import { removeNode } from '@//:modules/support'
import { GridTile, GridWrap, LoadMoreGridTile, SeriesTileOverlay } from '@//:modules/content/ContentSelection'
import { QueryArguments } from '@//:types/hooks'
import { EmptySeries } from '@//:modules/content/Placeholder'
import { Choice, useChoiceContext } from '../../Choice'

interface Props {
  queryArgs: QueryArguments
}

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
  @refetchable(queryName: "SelectSeriesPaginationFragment" )
  {
    series (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "AdminSeriesConnection_series")
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
  queryArgs
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<SelectSeriesSearchQuery>(
    Query,
    queryArgs.variables,
    queryArgs.options
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

  const { register } = useChoiceContext()

  if (series.length < 1) {
    return (
      <EmptySeries hint={queryArgs.variables.title} />
    )
  }

  return (
    <>
      <GridWrap justify='center'>
        {series.map((item, index) => (
          <GridTile key={index}>
            <Choice
              {...register(item.id, { tagTitle: item.title })}
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
    </>
  )
}
