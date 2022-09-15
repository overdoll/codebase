import { graphql } from 'react-relay'
import type { PreviewMediaFragment$key } from '@//:artifacts/PreviewMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import PreviewVideoMedia from '../Media/PreviewVideoMedia/PreviewVideoMedia'
import PreviewImageMedia from '../Media/PreviewImageMedia/PreviewImageMedia'

const Fragment = graphql`
  fragment PreviewMediaFragment on Media {
    __typename
    ...on ImageMedia {
      ...PreviewImageMediaFragment
    }
    ...on VideoMedia {
      ...PreviewVideoMediaFragment
    }
  }
`

interface Props {
  mediaQuery: PreviewMediaFragment$key
}

export default function PreviewMedia (props: Props): JSX.Element {
  const {
    mediaQuery
  } = props

  const data = useFragment(Fragment, mediaQuery)

  if (data.__typename === 'ImageMedia') {
    return (
      <PreviewImageMedia imageMediaQuery={data} />
    )
  }

  if (data.__typename === 'VideoMedia') {
    return (
      <PreviewVideoMedia videoMediaQuery={data} />
    )
  }

  return <></>
}
