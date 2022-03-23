import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminViewCancellationReasonQuery } from '@//:artifacts/AdminViewCancellationReasonQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import ChangeCancellationReasonTitle from './ChangeCancellationReasonTitle/ChangeCancellationReasonTitle'
import ChangeCancellationReasonDeprecated from './ChangeCancellationReasonDeprecated/ChangeCancellationReasonDeprecated'

interface Props {
  query: PreloadedQuery<AdminViewCancellationReasonQuery>
}

const Query = graphql`
  query AdminViewCancellationReasonQuery($reference: String!) {
    cancellationReason(reference: $reference) {
      ...ChangeCancellationReasonTitleFragment
      ...ChangeCancellationReasonDeprecatedFragment
    }
  }
`

export default function AdminViewCancellationReason ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminViewCancellationReasonQuery>(
    Query,
    query
  )

  if (queryData?.cancellationReason == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={8}>
      <Box>
        <ChangeCancellationReasonTitle query={queryData?.cancellationReason} />
      </Box>
      <Box>
        <ChangeCancellationReasonDeprecated query={queryData?.cancellationReason} />
      </Box>
    </Stack>
  )
}
