import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffViewTopicQuery } from '@//:artifacts/StaffViewTopicQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import ChangeTopicTitle from './ChangeTopicTitle/ChangeTopicTitle'
import ChangeTopicDescription from './ChangeTopicDescription/ChangeTopicDescription'
import ChangeTopicWeight from './ChangeTopicWeight/ChangeTopicWeight'
import ChangeTopicBanner from './ChangeTopicBanner/ChangeTopicBanner'

interface Props {
  query: PreloadedQuery<StaffViewTopicQuery>
}

const Query = graphql`
  query StaffViewTopicQuery($slug: String!) {
    topic(slug: $slug) {
      ...ChangeTopicTitleFragment
      ...ChangeTopicDescriptionFragment
      ...ChangeTopicWeightFragment
      ...ChangeTopicBannerFragment
    }
  }
`

export default function StaffViewTopic ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffViewTopicQuery>(
    Query,
    query
  )

  if (queryData?.topic == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={8}>
      <Box>
        <ChangeTopicTitle query={queryData.topic} />
      </Box>
      <Box>
        <ChangeTopicDescription query={queryData.topic} />
      </Box>
      <Box>
        <ChangeTopicWeight query={queryData.topic} />
      </Box>
      <Box>
        <ChangeTopicBanner query={queryData.topic} />
      </Box>
    </Stack>
  )
}
