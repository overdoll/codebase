import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { isProcessedFragment$key } from '@//:artifacts/isProcessedFragment.graphql'

const Fragment = graphql`
  fragment isProcessedFragment on Post {
    content {
      media {
        __typename
      }
    }
  }
`
export default function isProcessed (postQuery: isProcessedFragment$key): boolean {
  const data = useFragment(Fragment, postQuery)

  const processed = data.content.map((item) => item.media.__typename !== 'RawMedia')
  return processed.every(x => x)
}
