import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ThumbnailClubSettingsQuery } from '@//:artifacts/ThumbnailClubSettingsQuery.graphql'
import { HStack, Stack } from '@chakra-ui/react'
import ChangeClubThumbnailUpload from './ChangeClubThumbnailUpload/ChangeClubThumbnailUpload'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import ClubThumbnail from '@//:modules/content/DataDisplay/Club/ClubThumbnail/ClubThumbnail'

interface Props {
  query: PreloadedQuery<ThumbnailClubSettingsQuery>
}

const Query = graphql`
  query ThumbnailClubSettingsQuery($slug: String!) {
    club(slug: $slug) {
      ...ClubThumbnailFragment
      ...ChangeClubThumbnailUploadFragment
    }
  }
`

export default function ThumbnailClubSettings ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ThumbnailClubSettingsQuery>(
    Query,
    query
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  return (
    <Stack spacing={4}>
      <HStack spacing={8} align='flex-end' justify='center'>
        <ClubThumbnail
          w={24}
          h={24}
          query={queryData.club}
        />
        <ClubThumbnail
          w={16}
          h={16}
          query={queryData.club}
        />
        <ClubThumbnail
          w={8}
          h={8}
          query={queryData.club}
        />
      </HStack>
      <ChangeClubThumbnailUpload query={queryData.club} />
    </Stack>
  )
}
