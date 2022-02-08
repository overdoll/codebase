import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ProfileQuery } from '@//:artifacts/ProfileQuery.graphql'
import { graphql } from 'react-relay'
import { Heading, Stack } from '@chakra-ui/react'
import { LargeBackgroundBox, ResourceIcon } from '@//:modules/content/PageLayout'
import { NotFoundAccount } from '@//:modules/content/Placeholder'

interface Props {
  query: PreloadedQuery<ProfileQuery>
}

const Query = graphql`
  query ProfileQuery($username: String!) {
    account(username: $username) {
      username
      avatar {
        ...ResourceIconFragment
      }
    }
  }
`

export default function Profile (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ProfileQuery>(
    Query,
    props.query
  )

  if (queryData?.account == null) {
    return <NotFoundAccount />
  }

  return (
    <LargeBackgroundBox>
      <Stack align='center' p={4} spacing={2}>
        <ResourceIcon w={16} h={16} query={queryData?.account?.avatar} />
        <Heading color='gray.00' fontSize='4xl'>
          {queryData?.account?.username}
        </Heading>
      </Stack>
    </LargeBackgroundBox>
  )
}
