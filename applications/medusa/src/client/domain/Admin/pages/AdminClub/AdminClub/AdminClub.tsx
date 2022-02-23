import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminClubQuery } from '@//:artifacts/AdminClubQuery.graphql'
import { Box, Heading, HStack, Stack } from '@chakra-ui/react'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import { ResourceIcon } from '@//:modules/content/PageLayout'

interface Props {
  query: PreloadedQuery<AdminClubQuery>
}

const Query = graphql`
  query AdminClubQuery($slug: String!) {
    club(slug: $slug) {
      __typename
      name
      thumbnail {
        ...ResourceIconFragment
      }
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
      <HStack spacing={2}>
        <ResourceIcon w={14} h={14} query={queryData?.club?.thumbnail} />
        <Heading color='gray.00' fontSize='2xl'>
          {queryData?.club?.name}
        </Heading>
      </HStack>
      <Stack spacing={8}>
        <Box>
          <></>
        </Box>
      </Stack>
    </Stack>
  )
}
