import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubSettingsQuery } from '@//:artifacts/ClubSettingsQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import ChangeClubName from './ChangeClubName/ChangeClubName'
import ClubAliases from './ClubAliases/ClubAliases'
import ChangeClubThumbnail from './ChangeClubThumbnail/ChangeClubThumbnail'
import { NotFoundClub } from '@//:modules/content/Placeholder'

interface Props {
  query: PreloadedQuery<ClubSettingsQuery>
}

const Query = graphql`
  query ClubSettingsQuery($slug: String!) {
    club(slug: $slug) {
      ...ChangeClubNameFragment
      ...ClubAliasesFragment
      ...ChangeClubThumbnailFragment
    }
  }
`

export default function ClubSettings ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubSettingsQuery>(
    Query,
    query
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  return (
    <Stack spacing={8}>
      <Box>
        <ChangeClubName query={queryData.club} />
      </Box>
      <Box>
        <ClubAliases query={queryData.club} />
      </Box>
      <Box>
        <ChangeClubThumbnail query={queryData.club} />
      </Box>
    </Stack>
  )
}
