import { Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { graphql, PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay/hooks'
import { CreateClubQuery } from '@//:artifacts/CreateClubQuery.graphql'
import CreateClubForm from './CreateClubForm/CreateClubForm'
import { CreateClubFragment$key } from '@//:artifacts/CreateClubFragment.graphql'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'

interface Props {
  query: PreloadedQuery<CreateClubQuery>
}

const Query = graphql`
  query CreateClubQuery($first: Int, $after: String) {
    viewer {
      clubsLimit
      clubsCount
      ...CreateClubFragment
    }
  }
`

const Fragment = graphql`
  fragment CreateClubFragment on Account {
    clubs(first: $first, after: $after)
    @connection(key: "CreateClubFragment_clubs") {
      __id
      edges {
        node {
          id
          slug
          name
        }
      }
    }
  }
`

export default function CreateClub (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<CreateClubQuery>(
    Query,
    props.query
  )

  const data = useFragment<CreateClubFragment$key>(Fragment, queryData?.viewer)

  const canCreateClub = queryData.viewer != null ? queryData.viewer.clubsCount < queryData.viewer.clubsLimit : false

  return (
    <Stack spacing={4}>
      {!canCreateClub && (
        <Alert status='warning'>
          <AlertIcon />
          <AlertDescription>
            <Trans>
              You can only create a maximum of {queryData?.viewer?.clubsLimit} clubs
            </Trans>
          </AlertDescription>
        </Alert>)}
      <CreateClubForm connectionId={data?.clubs?.__id as string} isDisabled={!canCreateClub} />
    </Stack>
  )
}
