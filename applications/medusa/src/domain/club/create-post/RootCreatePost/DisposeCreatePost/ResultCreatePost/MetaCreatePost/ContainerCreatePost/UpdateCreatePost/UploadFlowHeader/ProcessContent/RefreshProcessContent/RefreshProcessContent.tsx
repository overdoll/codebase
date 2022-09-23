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
        ...InfoRawPostContentBannerFragment
      }
      ...RawCinematicContentFragment
      ...ContentModifyPreviewFragment
      ...ProcessContentDisplayFragment
    }
  }
`

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
