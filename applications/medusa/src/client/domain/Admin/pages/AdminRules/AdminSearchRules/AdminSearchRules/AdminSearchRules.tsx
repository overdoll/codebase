import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { AdminSearchRulesQuery } from '@//:artifacts/AdminSearchRulesQuery.graphql'
import { removeNode } from '@//:modules/support'
import { LinkTile, LoadMoreStackTile, RuleTileOverlay, StackTile } from '@//:modules/content/ContentSelection'
import { EmptyAudiences, EmptyBoundary } from '@//:modules/content/Placeholder'
import { ListSpacer } from '@//:modules/content/PageLayout'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query AdminSearchRulesQuery {
    ...AdminSearchRulesFragment
  }
`

const Fragment = graphql`
  fragment AdminSearchRulesFragment on Query
  @argumentDefinitions(
    first: {type: Int}
    after: {type: String}
  )
  @refetchable(queryName: "AdminSearchRulesPaginationFragment" )
  {
    rules (
      first: $first,
      after: $after,
    ) @connection(key: "AdminRulesConnection_rules")
    {
      edges {
        node {
          id
          ...RuleTileOverlayFragment
        }
      }
    }
  }
`

export default function AdminSearchRules ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<AdminSearchRulesQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<AdminSearchRulesQuery, any>(
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
        {rules.map((item, index) => (
          <StackTile key={index}>
            <LinkTile to={`/admin/rules/search/${item.id as string}`}>
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
