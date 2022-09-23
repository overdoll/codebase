import { graphql, useFragment } from 'react-relay'
import { ReactNode } from 'react'
import { SupporterSlideFragment$key } from '@//:artifacts/SupporterSlideFragment.graphql'
import { SupporterSlidePostFragment$key } from '@//:artifacts/SupporterSlidePostFragment.graphql'
import SupporterUnlocked from './SupporterUnlocked/SupporterUnlocked'
import SupporterLocked from './SupporterLocked/SupporterLocked'

interface Props {
  postContentQuery: SupporterSlideFragment$key
  postQuery: SupporterSlidePostFragment$key
  children: ReactNode
}

const PostContentFragment = graphql`
  fragment SupporterSlideFragment on PostContent {
    viewerCanViewSupporterOnlyContent
    isSupporterOnly
  }
`

const PostFragment = graphql`
  fragment SupporterSlidePostFragment on Post {
    ...SupporterLockedFragment
  }
`

export default function SupporterSlide (props: Props): JSX.Element {
  const {
    postContentQuery,
    postQuery,
    children
  } = props

  const postContentData = useFragment(PostContentFragment, postContentQuery)
  const postData = useFragment(PostFragment, postQuery)

  if (postContentData.isSupporterOnly) {
    if (postContentData.viewerCanViewSupporterOnlyContent) {
      return <SupporterUnlocked>{children}</SupporterUnlocked>
    }
    return <SupporterLocked postQuery={postData}>{children}</SupporterLocked>
  }

  return <>{children}</>
}
