import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminViewCategoryQuery } from '@//:artifacts/AdminViewCategoryQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import ChangeCategoryTitle from './ChangeCategoryTitle/ChangeCategoryTitle'
import ChangeCategoryThumbnail from './ChangeCategoryThumbnail/ChangeCategoryThumbnail'

interface Props {
  query: PreloadedQuery<AdminViewCategoryQuery>
}

const Query = graphql`
  query AdminViewCategoryQuery($slug: String!) {
    category(slug: $slug) {
      ...ChangeCategoryTitleFragment
      ...ChangeCategoryThumbnailFragment
    }
  }
`

export default function AdminViewCategory ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminViewCategoryQuery>(
    Query,
    query
  )

  if (queryData?.category == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={8}>
      <Box>
        <ChangeCategoryTitle query={queryData?.category} />
      </Box>
      <Box>
        <ChangeCategoryThumbnail query={queryData?.category} />
      </Box>
    </Stack>
  )
}
