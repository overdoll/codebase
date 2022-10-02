import { MobileAlternativeMenuFragment$key } from '@//:artifacts/MobileAlternativeMenuFragment.graphql'
import { graphql, useFragment } from 'react-relay/hooks'
import { useLingui } from '@lingui/react'
import { PageControllerSettings } from '@//:assets/icons'
import { t } from '@lingui/macro'
import React from 'react'
import MobileHorizontalNavigationDropdownMenu
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/MobileHorizontalNavigationDropdownMenu/MobileHorizontalNavigationDropdownMenu'
import DropdownMenuButtons from '../DropdownMenuButtons/DropdownMenuButtons'

interface Props {
  query: MobileAlternativeMenuFragment$key | null
}

const Fragment = graphql`
  fragment MobileAlternativeMenuFragment on Account {
    ...DropdownMenuButtonsFragment
  }
`

export default function MobileAlternativeMenu (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  return (
    <MobileHorizontalNavigationDropdownMenu
      label={i18n._(t`Dropdown Menu`)}
      icon={PageControllerSettings}
    >
      <DropdownMenuButtons query={data} />
    </MobileHorizontalNavigationDropdownMenu>
  )
}
