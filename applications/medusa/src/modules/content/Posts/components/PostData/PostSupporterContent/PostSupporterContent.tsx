import { graphql, useFragment } from 'react-relay'
import { ReactNode } from 'react'
import { PostSupporterContentFragment$key } from '@//:artifacts/PostSupporterContentFragment.graphql'
import { PostSupporterContentClubFragment$key } from '@//:artifacts/PostSupporterContentClubFragment.graphql'
import { PostSupporterContentViewerFragment$key } from '@//:artifacts/PostSupporterContentViewerFragment.graphql'
import PostSupporterContentUnlocked from './PostSupporterContentUnlocked/PostSupporterContentUnlocked'
import PostSupporterContentLocked from './PostSupporterContentLocked/PostSupporterContentLocked'
import ObserveContent from '../../PostPlayback/ObserveContent/ObserveContent'

interface Props {
  query: PostSupporterContentFragment$key
  clubQuery: PostSupporterContentClubFragment$key
  viewerQuery: PostSupporterContentViewerFragment$key | null
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

const ViewerFragment = graphql`
  fragment PostSupporterContentViewerFragment on Account {
    ...PostSupporterContentLockedViewerFragment
  }
`

export default function PostSupporterContent ({
  query,
  children,
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      {data.isSupporterOnly
        ? (data.viewerCanViewSupporterOnlyContent
            ? (
              <ObserveContent>
                {({
                  isObservingDebounced
                }) => (
                  <PostSupporterContentUnlocked isObservingDebounced={isObservingDebounced}>
                    {children}
                  </PostSupporterContentUnlocked>
                )}
              </ObserveContent>
              )
            : (
              <PostSupporterContentLocked clubQuery={clubData} viewerQuery={viewerData}>
                {children}
              </PostSupporterContentLocked>
              ))
        : children}
    </>
  )
}
