import { MenuLinkItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { Trans } from '@lingui/macro'
import { ClubPeopleGroup } from '@//:assets/icons'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubManageButtonFragment$key } from '@//:artifacts/ClubManageButtonFragment.graphql'

interface Props {
  query: ClubManageButtonFragment$key
}

const Fragment = graphql`
  fragment ClubManageButtonFragment on Club {
    slug
    viewerIsOwner
  }
`

export default function ClubManageButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (!data.viewerIsOwner) {
    return <></>
  }

  return (
    <MenuLinkItem
      href={`/club/${data.slug}/home`}
      text={(
        <Trans>
          Manage Club
        </Trans>)}
      colorScheme='teal'
      icon={ClubPeopleGroup}
    />
  )
}
