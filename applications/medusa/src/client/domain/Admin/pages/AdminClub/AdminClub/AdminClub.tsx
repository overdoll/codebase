import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminClubQuery } from '@//:artifacts/AdminClubQuery.graphql'
import { Box, HStack, Stack } from '@chakra-ui/react'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import AdminClubStatus from './AdminClubStatus/AdminClubStatus'
import AdminClubInfractions from './AdminClubInfractions/AdminClubInfractions'
import LargeClubHeader from '../../../../ManageClub/components/LargeClubHeader/LargeClubHeader'

interface Props {
  query: PreloadedQuery<AdminClubQuery>
}

const Query = graphql`
  query AdminClubQuery($slug: String!) {
    club(slug: $slug) {
      __typename
      ...LargeClubHeaderFragment
      ...AdminClubStatusFragment
      ...AdminClubInfractionsFragment
    }
  }
`

export default function AdminClub ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminClubQuery>(
    Query,
    query
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  return (
    <Stack spacing={6}>
      <HStack spacing={3}>
        <LargeClubHeader query={queryData.club} />
      </HStack>
      <Stack spacing={8}>
        <Box>
          <AdminClubStatus query={queryData.club} />
        </Box>
        <Box>
          <AdminClubInfractions query={queryData.club} />
        </Box>
      </Stack>
    </Stack>
  )
}
