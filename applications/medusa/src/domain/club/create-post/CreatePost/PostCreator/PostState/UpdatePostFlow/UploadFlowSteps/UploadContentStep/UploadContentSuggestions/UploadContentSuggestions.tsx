import { graphql, useFragment } from 'react-relay/hooks'
import type { UploadContentSuggestionsFragment$key } from '@//:artifacts/UploadContentSuggestionsFragment.graphql'
import { Stack } from '@chakra-ui/react'
import UploadSupporterContentOptimization from './UploadSupporterContentOptimization/UploadSupporterContentOptimization'

interface Props {
  query: UploadContentSuggestionsFragment$key
}

const Fragment = graphql`
  fragment UploadContentSuggestionsFragment on Post {
    content {
      isSupporterOnly
    }
  }
`

export default function UploadContentSuggestions ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const hasSupporterContentOptimization: boolean = (data?.content?.[0] != null && data.content[0].isSupporterOnly)

  return (
    <Stack spacing={1}>
      {hasSupporterContentOptimization && (
        <UploadSupporterContentOptimization />
      )}
    </Stack>
  )
}
