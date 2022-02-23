import { Menu, MenuLinkItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { Trans } from '@lingui/macro'
import { LoginKeys } from '@//:assets/icons'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubMenuFragment$key } from '@//:artifacts/ClubMenuFragment.graphql'
import Can from '@//:modules/authorization/Can'

interface Props {
  query: ClubMenuFragment$key
}

const Fragment = graphql`
  fragment ClubMenuFragment on Club {
    slug
  }
`

export default function ClubMenu ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Menu>
      <Can I='admin' a='Club'>
        <MenuLinkItem
          to={`/admin/club/${data.slug as string}`}
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
