import { Menu, MenuLinkItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { Trans } from '@lingui/macro'
import { LoginKeys } from '@//:assets/icons'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ProfileMenuFragment$key } from '@//:artifacts/ProfileMenuFragment.graphql'
import Can from '@//:modules/authorization/Can'

interface Props {
  query: ProfileMenuFragment$key
}

const Fragment = graphql`
  fragment ProfileMenuFragment on Account {
    username
  }
`

export default function ProfileMenu ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Menu>
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
    </Menu>
  )
}
