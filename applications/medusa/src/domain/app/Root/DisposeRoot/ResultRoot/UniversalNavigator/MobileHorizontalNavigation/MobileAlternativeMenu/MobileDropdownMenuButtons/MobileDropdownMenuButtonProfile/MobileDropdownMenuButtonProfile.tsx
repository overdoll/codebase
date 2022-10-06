import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { MobileDropdownMenuButtonProfileQuery } from '@//:artifacts/MobileDropdownMenuButtonProfileQuery.graphql'
import { Trans } from '@lingui/macro'
import AccountIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/AccountIcon/AccountIcon'
import React from 'react'
import MobileHorizontalNavigationDropdownMenuButton
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/MobileHorizontalNavigationDropdownMenu/MobileHorizontalNavigationDropdownMenuButton/MobileHorizontalNavigationDropdownMenuButton'

const Query = graphql`
  query MobileDropdownMenuButtonProfileQuery {
    viewer {
      username
      ...AccountIconFragment
    }
  }
`

export default function MobileDropdownMenuButtonProfile (): JSX.Element {
  const data = useLazyLoadQuery<MobileDropdownMenuButtonProfileQuery>(Query, {})

  if (data.viewer == null) return <></>

  return (
    <MobileHorizontalNavigationDropdownMenuButton
      href={{
        pathname: '/profile/[username]',
        query: { username: data.viewer.username }
      }}
      label={
        <Trans>
          My Profile
        </Trans>
      }
    >
      <AccountIcon size='md' accountQuery={data.viewer} />
    </MobileHorizontalNavigationDropdownMenuButton>
  )
}
