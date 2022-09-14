import { MaybeRenderProp } from '@//:types/components'
import encodeJoinRedirect from '@//:modules/support/encodeJoinRedirect'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubGuestJoinWrapperFragment$key } from '@//:artifacts/ClubGuestJoinWrapperFragment.graphql'
import runIfFunction from '@//:modules/support/runIfFunction'
import { useRouter } from 'next/router'

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

  const router = useRouter()

  const redirect = encodeJoinRedirect({
    pathname: '/[slug]',
    query: {
      slug: data.slug
    }
  }, 'club_join_button')

  const onJoinClub = (): void => {
    void router.push(redirect)
  }

  return (
    <>
      {runIfFunction(children, {
        joinClub: onJoinClub
      })}
    </>
  )
}
