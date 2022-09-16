import { graphql } from 'react-relay'
import type { RawThumbnailMediaFragment$key } from '@//:artifacts/RawThumbnailMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ProcessingRawMedia from '../Media/ProcessingRawMedia/ProcessingRawMedia'
import ThumbnailMedia from '../ThumbnailMedia/ThumbnailMedia'

const Fragment = graphql`
  fragment RawThumbnailMediaFragment on Media {
    __typename
    ...on RawMedia {
      ...ProcessingRawMediaFragment
    }
    ...ThumbnailMediaFragment
  }
`

interface Props {
  mediaQuery: RawThumbnailMediaFragment$key
}

export default function RawThumbnailMedia (props: Props): JSX.Element {
  const {
    mediaQuery
  } = props

  const data = useFragment(Fragment, mediaQuery)

  if (data?.__typename === 'RawMedia') {
    return <ProcessingRawMedia rawMediaQuery={data} />
  }

  return <ThumbnailMedia mediaQuery={data} />
}
