import { MaybeRenderProp } from '@//:types/components'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubGuestSupportWrapperFragment$key } from '@//:artifacts/ClubGuestSupportWrapperFragment.graphql'
import runIfFunction from '@//:modules/support/runIfFunction'
import { useJoin } from '../../../../../../../../../../../app/Root/DisposeRoot/ResultRoot/JoinModal/JoinModal'

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

  const onJoin = useJoin(`/${data.slug}?support=true`, 'club_support_button')

  const onSupportClub = (): void => {
    onJoin()
  }

  return (
    <>
      {runIfFunction(children, {
        supportClub: onSupportClub
      })}
    </>
  )
}
