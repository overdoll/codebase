import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import {
  StaffSearchAudiencesQuery,
  StaffSearchAudiencesQuery$variables
} from '@//:artifacts/StaffSearchAudiencesQuery.graphql'
import removeNode from '@//:modules/support/removeNode'
import { AudienceTileOverlay, GridWrap, LinkTile } from '@//:modules/content/ContentSelection'
import { EmptyAudiences, EmptyBoundary } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import ShortGridTile from '@//:modules/content/ContentSelection/ShortGridTile/ShortGridTile'
import LoadMoreShortGridTile
  from '@//:modules/content/ContentSelection/ShortGridTile/LoadMoreShortGridTile/LoadMoreShortGridTile'

interface Props extends ComponentSearchArguments<StaffSearchAudiencesQuery$variables> {
}

const Query = graphql`
  query StaffSearchAudiencesQuery($title: String) {
    ...StaffSearchAudiencesFragment
  }
`

const Fragment = graphql`
  fragment StaffSearchAudiencesFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 100}
    after: {type: String}
  )
  @refetchable(queryName: "StaffSearchAudiencesPaginationFragment" )
  {
    audiences (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "StaffAudiencesConnection_audiences")
    {
      edges {
        node {
          slug
          ...AudienceTileOverlayFragment
        }
      }
    }
  }
`

export default function StaffSearchAudiences ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<StaffSearchAudiencesQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<StaffSearchAudiencesQuery, any>(
    Fragment,
    queryData
  )
  const audiences = removeNode(data.audiences.edges)

  return (
    <EmptyBoundary
      fallback={<EmptyAudiences hint={searchArguments.variables.title} />}
      condition={audiences.length < 1}
    >
      <GridWrap>
        {audiences.map((item, index) => (
          <ShortGridTile key={index}>
            <LinkTile href={{
              pathname: '/staff/entity/audience/[slug]',
              query: { slug: item.slug }
            }}
            >
              <AudienceTileOverlay query={item} />
            </LinkTile>
          </ShortGridTile>
        )
        )}
        <LoadMoreShortGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </EmptyBoundary>
  )
}
