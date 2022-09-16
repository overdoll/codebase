import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type {
  RefreshProcessContentQuery,
  RefreshProcessContentQuery$variables
} from '@//:artifacts/RefreshProcessContentQuery.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import ProcessContentDisplay from '../ProcessContentDisplay/ProcessContentDisplay'

interface Props extends ComponentSearchArguments<RefreshProcessContentQuery$variables> {
}

const Query = graphql`
  query RefreshProcessContentQuery($reference: String!) {
    post (reference: $reference) {
      id
      state
      reference
      content {
        id
        viewerCanViewSupporterOnlyContent
        isSupporterOnly
        media {
          ...RawCinematicMediaFragment
          ...RawThumbnailMediaFragment
        }
        resource {
          id
          failed
          type
          processed
          videoDuration
          progress {
            state
            progress
          }
          videoThumbnail {
            url
          }
          urls {
            mimeType
            url
          }
          width
          height
          preview
        }
        ...PostContentPreviewMemoFragment
      }
      ...ProcessContentDisplayFragment
      ...PostContentPreviewMemoPostFragment
      ...DraftPostFragment
      ...PublishedPostFragment
      ...ReviewPostFragment
      ...RejectedPostFragment
      ...ArchivedPostFragment
      ...RemovedPostFragment
    }
  }
`

export const isProcessed = (content): boolean => {
  const processed = content.map((item) => item.resource.processed) as boolean[]
  return processed.every(x => x)
}

export const isFailed = (content): boolean => {
  const failed = content.map((item) => item.resource.failed) as boolean[]
  return failed.some(x => x)
}

export default function RefreshProcessContent ({
  searchArguments
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<RefreshProcessContentQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  if (queryData.post == null) return <></>

  return (
    <ProcessContentDisplay query={queryData.post} />
  )
}
