import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffViewCharacterQuery } from '@//:artifacts/StaffViewCharacterQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import ChangeCharacterName from './ChangeCharacterName/ChangeCharacterName'
import ChangeCharacterThumbnail from './ChangeCharacterThumbnail/ChangeCharacterThumbnail'

interface Props {
  query: PreloadedQuery<StaffViewCharacterQuery>
}

const Query = graphql`
  query StaffViewCharacterQuery($slug: String!, $seriesSlug: String!) {
    character(slug: $slug, seriesSlug: $seriesSlug) {
      ...ChangeCharacterNameFragment
      ...ChangeCharacterThumbnailFragment
    }
  }
`

export default function StaffViewCharacter ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffViewCharacterQuery>(
    Query,
    query
  )

  if (queryData?.character == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={8}>
      <Box>
        <ChangeCharacterName query={queryData?.character} />
      </Box>
      <Box>
        <ChangeCharacterThumbnail query={queryData?.character} />
      </Box>
    </Stack>
  )
}
