import { MaybeRenderProp } from '@//:types/components'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubRedirectSupportWrapperFragment$key } from '@//:artifacts/ClubRedirectSupportWrapperFragment.graphql'
import runIfFunction from '@//:modules/support/runIfFunction'
import { useRouter } from 'next/router'

interface ChildrenCallable {
  supportClub: () => void
}

interface Props {
  query: ClubRedirectSupportWrapperFragment$key
  children: MaybeRenderProp<ChildrenCallable>
}

const Fragment = graphql`
  fragment ClubRedirectSupportWrapperFragment on Club {
    slug
    canSupport
  }
`

export default function ClubRedirectSupportWrapper ({
  children,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const router = useRouter()

  const onSupportClub = (): void => {
    void router.push({
      pathname: '/[slug]',
      query: {
        slug: data.slug,
        ...((Boolean(data.canSupport)) && { support: true })
      }
    })
  }

  return (
    <>
      {runIfFunction(children, {
        supportClub: onSupportClub
      })}
    </>
  )
}
