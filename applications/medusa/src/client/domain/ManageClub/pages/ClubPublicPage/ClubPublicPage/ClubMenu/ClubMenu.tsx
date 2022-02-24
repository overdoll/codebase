import { Menu, MenuLinkItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { Trans } from '@lingui/macro'
import { LoginKeys } from '@//:assets/icons'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubMenuFragment$key } from '@//:artifacts/ClubMenuFragment.graphql'
import Can from '@//:modules/authorization/Can'
import { useContext } from 'react'
import { AbilityContext } from '@//:modules/authorization/AbilityContext'

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

  const ability = useContext(AbilityContext)

  const isDisabled = ability.cannot('interact', 'Club')

  return (
    <Menu isDisabled={isDisabled}>
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
    </Menu>
  )
}
