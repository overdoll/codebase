import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffViewCancellationReasonQuery } from '@//:artifacts/StaffViewCancellationReasonQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import ChangeCancellationReasonTitle from './ChangeCancellationReasonTitle/ChangeCancellationReasonTitle'
import ChangeCancellationReasonDeprecated from './ChangeCancellationReasonDeprecated/ChangeCancellationReasonDeprecated'

interface Props {
  query: PreloadedQuery<StaffViewCancellationReasonQuery>
}

const Query = graphql`
  query StaffViewCancellationReasonQuery($reference: String!) {
    cancellationReason(reference: $reference) {
      ...ChangeCancellationReasonTitleFragment
      ...ChangeCancellationReasonDeprecatedFragment
    }
  }
`

export default function StaffViewCancellationReason ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffViewCancellationReasonQuery>(
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
