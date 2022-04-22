import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffCreateCategoryQuery } from '@//:artifacts/StaffCreateCategoryQuery.graphql'
import CreateCategoryForm from './CreateCategoryForm/CreateCategoryForm'

interface Props {
  query: PreloadedQuery<StaffCreateCategoryQuery>
}

const Query = graphql`
  query StaffCreateCategoryQuery($first: Int, $after: String) @preloadable {
    categories (first: $first, after: $after)
    @connection(key: "StaffCategoriesConnection_categories") {
      __id
      edges {
        __typename
      }
    }
  }
`

export default function StaffCreateCategory (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffCreateCategoryQuery>(
    Query,
    props.query
  )

  return (
    <CreateCategoryForm connectionId={queryData?.categories.__id} />
  )
}
