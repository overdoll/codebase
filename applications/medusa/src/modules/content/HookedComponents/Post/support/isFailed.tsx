import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { isFailedFragment$key } from '@//:artifacts/isFailedFragment.graphql'

const Fragment = graphql`
  fragment isFailedFragment on Post {
    content {
      media {
        __typename
        ...on RawMedia {
          failed
        }
      }
    }
  }
`
export default function isFailed (postQuery: isFailedFragment$key): boolean {
  const data = useFragment(Fragment, postQuery)

  const failed = data.content.map((item) => item.media.__typename === 'RawMedia' && item.media.failed)
  return failed.some(x => x)
}
