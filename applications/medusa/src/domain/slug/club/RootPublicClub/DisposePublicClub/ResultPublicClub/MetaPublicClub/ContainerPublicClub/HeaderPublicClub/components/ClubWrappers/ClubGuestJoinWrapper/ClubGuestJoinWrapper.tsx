import { MaybeRenderProp } from '@//:types/components'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubGuestJoinWrapperFragment$key } from '@//:artifacts/ClubGuestJoinWrapperFragment.graphql'
import runIfFunction from '@//:modules/support/runIfFunction'
import { useJoin } from '../../../../../../../../../../../app/Root/DisposeRoot/ResultRoot/JoinModal/JoinModal'

interface ChildrenCallable {
  joinClub: () => void
}

interface Props {
  query: ClubGuestJoinWrapperFragment$key
  children: MaybeRenderProp<ChildrenCallable>
}

const Fragment = graphql`
  fragment ClubGuestJoinWrapperFragment on Club {
    slug
  }
`

export default function ClubGuestJoinWrapper ({
  children,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const onJoin = useJoin({
    pathname: '/[slug]',
    query: {
      slug: data.slug
    }
  }, 'club_join_button')

  return (
    <>
      {runIfFunction(children, {
        joinClub: onJoin
      })}
    </>
  )
}
