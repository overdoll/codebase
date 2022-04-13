import { MenuLinkItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { Trans } from '@lingui/macro'
import { ClubPeopleGroup } from '@//:assets/icons'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubPageButtonFragment$key } from '@//:artifacts/ClubPageButtonFragment.graphql'

interface Props {
  query: ClubPageButtonFragment$key
}

const Fragment = graphql`
  fragment ClubPageButtonFragment on Club {
    slug
  }
`

export default function ClubPageButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <MenuLinkItem
      to={`/${data.slug}`}
      text={(
        <Trans>
          Public Page
        </Trans>)}
      icon={ClubPeopleGroup}
    />
  )
}
