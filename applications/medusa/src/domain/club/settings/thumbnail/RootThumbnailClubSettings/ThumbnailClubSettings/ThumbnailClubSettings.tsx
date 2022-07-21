import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ThumbnailClubSettingsQuery } from '@//:artifacts/ThumbnailClubSettingsQuery.graphql'
import { HStack, Stack } from '@chakra-ui/react'
import { ResourceIcon } from '@//:modules/content/PageLayout'
import ChangeClubThumbnailUpload from './ChangeClubThumbnailUpload/ChangeClubThumbnailUpload'
import { NotFoundClub } from '@//:modules/content/Placeholder'

interface Props {
  query: PreloadedQuery<ThumbnailClubSettingsQuery>
}

const Query = graphql`
  query ThumbnailClubSettingsQuery($slug: String!) {
    club(slug: $slug) {
      id
      thumbnail {
        ...ResourceIconFragment
      }
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
        <ResourceIcon
          showBorder
          seed={queryData.club.id}
          w={24}
          h={24}
          query={queryData.club.thumbnail}
        />
        <ResourceIcon
          showBorder
          seed={queryData.club.id}
          w={16}
          h={16}
          query={queryData.club.thumbnail}
        />
        <ResourceIcon
          showBorder
          seed={queryData.club.id}
          w={8}
          h={8}
          query={queryData.club.thumbnail}
        />
      </HStack>
      <ChangeClubThumbnailUpload query={queryData.club} />
    </Stack>
  )
}
