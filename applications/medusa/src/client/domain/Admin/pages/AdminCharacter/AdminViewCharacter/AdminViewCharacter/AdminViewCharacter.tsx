import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminViewCharacterQuery } from '@//:artifacts/AdminViewCharacterQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import ChangeCharacterName from './ChangeCharacterName/ChangeCharacterName'
import ChangeCharacterThumbnail from './ChangeCharacterThumbnail/ChangeCharacterThumbnail'

interface Props {
  query: PreloadedQuery<AdminViewCharacterQuery>
}

const Query = graphql`
  query AdminViewCharacterQuery($slug: String!, $seriesSlug: String!) {
    character(slug: $slug, seriesSlug: $seriesSlug) {
      ...ChangeCharacterNameFragment
      ...ChangeCharacterThumbnailFragment
    }
  }
`

export default function AdminViewCharacter ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminViewCharacterQuery>(
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
