import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffViewCategoryQuery } from '@//:artifacts/StaffViewCategoryQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import ChangeCategoryTitle from './ChangeCategoryTitle/ChangeCategoryTitle'
import ChangeCategoryTopic from './ChangeCategoryTopic/ChangeCategoryTopic'

interface Props {
  query: PreloadedQuery<StaffViewCategoryQuery>
}

const Query = graphql`
  query StaffViewCategoryQuery($slug: String!) @preloadable {
    category(slug: $slug) {
      ...ChangeCategoryTitleFragment
      ...ChangeCategoryTopicFragment
    }
  }
`

export default function StaffViewCategory ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffViewCategoryQuery>(
    Query,
    query
  )

  if (queryData?.category == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={8}>
      <Box>
        <ChangeCategoryTitle query={queryData.category} />
      </Box>
      <Box>
        <ChangeCategoryTopic query={queryData.category} />
      </Box>
    </Stack>
  )
}
