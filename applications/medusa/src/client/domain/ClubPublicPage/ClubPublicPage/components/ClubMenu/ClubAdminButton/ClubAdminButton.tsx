import { MenuLinkItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { Trans } from '@lingui/macro'
import { LoginKeys } from '@//:assets/icons'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubAdminButtonFragment$key } from '@//:artifacts/ClubAdminButtonFragment.graphql'
import Can from '@//:modules/authorization/Can'

interface Props {
  query: ClubAdminButtonFragment$key
}

const Fragment = graphql`
  fragment ClubAdminButtonFragment on Club {
    slug
  }
`

export default function ClubAdminButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Can I='admin' a='Club'>
      <MenuLinkItem
        to={`/admin/club/${data.slug}`}
        text={(
          <Trans>
            Admin
          </Trans>)}
        colorScheme='purple'
        icon={LoginKeys}
      />
    </Can>
  )
}
