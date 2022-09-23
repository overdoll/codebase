import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffViewSeriesQuery } from '@//:artifacts/StaffViewSeriesQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import ChangeSeriesTitle from './ChangeSeriesTitle/ChangeSeriesTitle'
import StaffSeriesSearchCharacters from './StaffSeriesSearchCharacters/StaffSeriesSearchCharacters'

interface Props {
  query: PreloadedQuery<StaffViewSeriesQuery>
}

const Query = graphql`
  query StaffViewSeriesQuery($slug: String!) {
    serial(slug: $slug) {
      ...ChangeSeriesTitleFragment
      ...StaffSeriesSearchCharactersFragment
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
        <StaffSeriesSearchCharacters query={queryData.serial} />
      </Box>
    </Stack>
  )
}
