import { MenuLinkItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { Trans } from '@lingui/macro'
import { LoginKeys } from '@//:assets/icons'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubStaffButtonFragment$key } from '@//:artifacts/ClubStaffButtonFragment.graphql'
import Can from '@//:modules/authorization/Can'

interface Props {
  query: ClubStaffButtonFragment$key
}

const Fragment = graphql`
  fragment ClubStaffButtonFragment on Club {
    slug
  }
`

export default function ClubStaffButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Can I='staff' a='Club'>
      <MenuLinkItem
        href={`/staff/club/${data.slug}`}
        text={(
          <Trans>
            Staff
          </Trans>)}
        colorScheme='purple'
        icon={LoginKeys}
      />
    </Can>
  )
}
