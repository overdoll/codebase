import { graphql } from 'react-relay'
import type { RawPreviewMediaFragment$key } from '@//:artifacts/RawPreviewMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ProcessingRawMedia from '../Media/ProcessingRawMedia/ProcessingRawMedia'
import PreviewMedia from '../PreviewMedia/PreviewMedia'

const Fragment = graphql`
  fragment RawPreviewMediaFragment on Media {
    __typename
    ...on RawMedia {
      ...ProcessingRawMediaFragment
    }
    ...PreviewMediaFragment
  }
`

interface Props {
  mediaQuery: RawPreviewMediaFragment$key
}

export default function RawPreviewMedia (props: Props): JSX.Element {
  const {
    mediaQuery
  } = props

  const data = useFragment(Fragment, mediaQuery)

  if (data.__typename === 'RawMedia') {
    return <ProcessingRawMedia rawMediaQuery={data} />
  }

  return <PreviewMedia mediaQuery={data} />
}
