import { MaybeRenderProp } from '@//:types/components'
import encodeJoinRedirect from '@//:modules/support/encodeJoinRedirect'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubGuestSupportWrapperFragment$key } from '@//:artifacts/ClubGuestSupportWrapperFragment.graphql'
import runIfFunction from '@//:modules/support/runIfFunction'
import { useRouter } from 'next/router'

interface ChildrenCallable {
  supportClub: () => void
}

interface Props {
  query: ClubGuestSupportWrapperFragment$key
  children: MaybeRenderProp<ChildrenCallable>
}

const Fragment = graphql`
  fragment ClubGuestSupportWrapperFragment on Club {
    slug
  }
`

export default function ClubGuestSupportWrapper ({
  children,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const router = useRouter()

  const redirect = encodeJoinRedirect(`/${data.slug}?support=true`)

  const onSupportClub = (): void => {
    void router.push(redirect)
  }

  return (
    <>
      {runIfFunction(children, {
        supportClub: onSupportClub
      })}
    </>
  )
}
