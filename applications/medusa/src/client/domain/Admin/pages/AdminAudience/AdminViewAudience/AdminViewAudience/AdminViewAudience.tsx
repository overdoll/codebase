import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminViewAudienceQuery } from '@//:artifacts/AdminViewAudienceQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import ChangeAudienceTitle from './ChangeAudienceTitle/ChangeAudienceTitle'
import ChangeAudienceThumbnail from './ChangeAudienceThumbnail/ChangeAudienceThumbnail'
import ChangeAudienceStandard from './ChangeAudienceStandard/ChangeAudienceStandard'

interface Props {
  query: PreloadedQuery<AdminViewAudienceQuery>
}

const Query = graphql`
  query AdminViewAudienceQuery($slug: String!) {
    audience(slug: $slug) {
      ...ChangeAudienceTitleFragment
      ...ChangeAudienceThumbnailFragment
      ...ChangeAudienceStandardFragment
    }
  }
`

export default function AdminViewAudience ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminViewAudienceQuery>(
    Query,
    query
  )

  if (queryData?.audience == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={8}>
      <Box>
        <ChangeAudienceTitle query={queryData?.audience} />
      </Box>
      <Box>
        <ChangeAudienceThumbnail query={queryData?.audience} />
      </Box>
      <Box>
        <ChangeAudienceStandard query={queryData?.audience} />
      </Box>
    </Stack>
  )
}
