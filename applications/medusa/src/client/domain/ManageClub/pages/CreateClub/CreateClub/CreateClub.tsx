import { Alert, AlertDescription, AlertIcon, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { CreateClubQuery } from '@//:artifacts/CreateClubQuery.graphql'
import CreateClubForm from './CreateClubForm/CreateClubForm'

interface Props {
  query: PreloadedQuery<CreateClubQuery>
}

const Query = graphql`
  query CreateClubQuery {
    viewer {
      clubsLimit
      clubsCount
    }
  }
`

export default function CreateClub (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<CreateClubQuery>(
    Query,
    props.query
  )

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
      <CreateClubForm isDisabled={!canCreateClub} />
    </Stack>
  )
}
