import { graphql } from 'react-relay'
import type { PostContentBannerFragment$key } from '@//:artifacts/PostContentBannerFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { ThumbnailMedia } from '../../../../Media'

const Fragment = graphql`
  fragment PostContentBannerFragment on PostContent {
    media {
      ...ThumbnailMediaFragment
    }
  }
`

interface Props {
  postContentQuery: PostContentBannerFragment$key
}

export default function PostContentBanner (props: Props): JSX.Element {
  const {
    postContentQuery
  } = props

  const data = useFragment(Fragment, postContentQuery)

  return (
    <ThumbnailMedia mediaQuery={data.media} />
  )
}
