import { useLingui } from '@lingui/react'
import { PageControllerSettings } from '@//:assets/icons'
import { t } from '@lingui/macro'
import React from 'react'
import MobileHorizontalNavigationDropdownMenu
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/MobileHorizontalNavigationDropdownMenu/MobileHorizontalNavigationDropdownMenu'
import MobileDropdownMenuButtons from './MobileDropdownMenuButtons/MobileDropdownMenuButtons'

export default function MobileAlternativeMenu (): JSX.Element {
  const { i18n } = useLingui()

  return (
    <MobileHorizontalNavigationDropdownMenu
      label={i18n._(t`Dropdown Menu`)}
      icon={PageControllerSettings}
    >
      <MobileDropdownMenuButtons />
    </MobileHorizontalNavigationDropdownMenu>
  )
}
