import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffViewSeriesQuery } from '@//:artifacts/StaffViewSeriesQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import ChangeSeriesTitle from './ChangeSeriesTitle/ChangeSeriesTitle'
import ChangeSeriesThumbnail from './ChangeSeriesThumbnail/ChangeSeriesThumbnail'

interface Props {
  query: PreloadedQuery<StaffViewSeriesQuery>
}

const Query = graphql`
  query StaffViewSeriesQuery($slug: String!) {
    serial(slug: $slug) {
      ...ChangeSeriesTitleFragment
      ...ChangeSeriesThumbnailFragment
    }
  }
`

export default function StaffViewSeries ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffViewSeriesQuery>(
    Query,
    query
  )

  if (queryData?.serial == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={8}>
      <Box>
        <ChangeSeriesTitle query={queryData?.serial} />
      </Box>
      <Box>
        <ChangeSeriesThumbnail query={queryData?.serial} />
      </Box>
    </Stack>
  )
}
