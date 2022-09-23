import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ThumbnailClubSettingsQuery } from '@//:artifacts/ThumbnailClubSettingsQuery.graphql'
import { HStack, Stack } from '@chakra-ui/react'
import ChangeClubThumbnailUpload from './ChangeClubThumbnailUpload/ChangeClubThumbnailUpload'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'

interface Props {
  query: PreloadedQuery<ThumbnailClubSettingsQuery>
}

const Query = graphql`
  query ThumbnailClubSettingsQuery($slug: String!) {
    club(slug: $slug) {
      id
      ...ClubIconFragment
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
        <ClubIcon size='xl' clubQuery={queryData?.club} />
        <ClubIcon size='lg' clubQuery={queryData?.club} />
        <ClubIcon size='md' clubQuery={queryData?.club} />
        <ClubIcon size='sm' clubQuery={queryData?.club} />
      </HStack>
      <ChangeClubThumbnailUpload query={queryData.club} />
    </Stack>
  )
}
