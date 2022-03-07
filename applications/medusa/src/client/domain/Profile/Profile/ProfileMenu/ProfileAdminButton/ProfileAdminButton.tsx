import { MenuLinkItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { Trans } from '@lingui/macro'
import { LoginKeys } from '@//:assets/icons'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ProfileAdminButtonFragment$key } from '@//:artifacts/ProfileAdminButtonFragment.graphql'
import Can from '@//:modules/authorization/Can'

interface Props {
  query: ProfileAdminButtonFragment$key
}

const Fragment = graphql`
  fragment ProfileAdminButtonFragment on Account {
    username
  }
`

export default function ProfileAdminButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Can I='admin' a='Account'>
      <MenuLinkItem
        to={`/admin/account/${data.username}`}
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
