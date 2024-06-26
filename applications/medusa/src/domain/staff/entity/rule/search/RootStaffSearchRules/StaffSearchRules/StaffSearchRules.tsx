import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { StaffSearchRulesQuery } from '@//:artifacts/StaffSearchRulesQuery.graphql'
import removeNode from '@//:modules/support/removeNode'
import { LinkTile, LoadMoreStackTile, RuleTileOverlay, StackTile } from '@//:modules/content/ContentSelection'
import { EmptyAudiences, EmptyBoundary } from '@//:modules/content/Placeholder'
import { ListSpacer } from '@//:modules/content/PageLayout'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query StaffSearchRulesQuery {
    ...StaffSearchRulesFragment
  }
`

const Fragment = graphql`
  fragment StaffSearchRulesFragment on Query
  @argumentDefinitions(
    first: {type: Int}
    after: {type: String}
  )
  @refetchable(queryName: "StaffSearchRulesPaginationFragment" )
  {
    rules (
      first: $first,
      after: $after,
    ) @connection(key: "StaffRulesConnection_rules")
    {
      edges {
        node {
          id
          reference
          ...RuleTileOverlayFragment
        }
      }
    }
  }
`

export default function StaffSearchRules ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<StaffSearchRulesQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<StaffSearchRulesQuery, any>(
    Fragment,
    queryData
  )
  const rules = removeNode(data.rules.edges)

  return (
    <EmptyBoundary
      fallback={<EmptyAudiences />}
      condition={rules.length < 1}
    >
      <ListSpacer>
        {rules.map((item) => (
          <StackTile key={item.id}>
            <LinkTile href={{
              pathname: '/staff/entity/rule/[reference]',
              query: { reference: item.reference }
            }}
            >
              <RuleTileOverlay query={item} />
            </LinkTile>
          </StackTile>
        )
        )}
        <LoadMoreStackTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </ListSpacer>
    </EmptyBoundary>
  )
}
