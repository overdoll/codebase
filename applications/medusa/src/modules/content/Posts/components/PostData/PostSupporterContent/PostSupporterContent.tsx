import { graphql, useFragment } from 'react-relay'
import { ReactNode } from 'react'
import { PostSupporterContentFragment$key } from '@//:artifacts/PostSupporterContentFragment.graphql'
import { PostSupporterContentClubFragment$key } from '@//:artifacts/PostSupporterContentClubFragment.graphql'
import PostSupporterContentUnlocked from './PostSupporterContentUnlocked/PostSupporterContentUnlocked'
import PostSupporterContentLocked from './PostSupporterContentLocked/PostSupporterContentLocked'

interface Props {
  query: PostSupporterContentFragment$key
  clubQuery: PostSupporterContentClubFragment$key
  children: ReactNode
}

const Fragment = graphql`
  fragment PostSupporterContentFragment on PostContent {
    viewerCanViewSupporterOnlyContent
    isSupporterOnly
  }
`

const ClubFragment = graphql`
  fragment PostSupporterContentClubFragment on Club {
    ...PostSupporterContentLockedFragment
  }
`

export default function PostSupporterContent ({
  query,
  children,
  clubQuery
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const clubData = useFragment(ClubFragment, clubQuery)

  return (
    <>
      {data.isSupporterOnly
        ? (data.viewerCanViewSupporterOnlyContent
            ? (
              <PostSupporterContentUnlocked>
                {children}
              </PostSupporterContentUnlocked>)
            : (
              <PostSupporterContentLocked query={clubData}>
                {children}
              </PostSupporterContentLocked>
              ))
        : children}
    </>
  )
}
