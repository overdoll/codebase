import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminCreateCategoryQuery } from '@//:artifacts/AdminCreateCategoryQuery.graphql'
import CreateCategoryForm from './CreateCategoryForm/CreateCategoryForm'

interface Props {
  query: PreloadedQuery<AdminCreateCategoryQuery>
}

const Query = graphql`
  query AdminCreateCategoryQuery($first: Int, $after: String) {
    categories (first: $first, after: $after)
    @connection(key: "AdminCategoriesConnection_categories") {
      __id
      edges {
        __typename
      }
    }
  }
`

export default function AdminCreateCategory (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminCreateCategoryQuery>(
    Query,
    props.query
  )

  return (
    <CreateCategoryForm connectionId={queryData?.categories.__id} />
  )
}
