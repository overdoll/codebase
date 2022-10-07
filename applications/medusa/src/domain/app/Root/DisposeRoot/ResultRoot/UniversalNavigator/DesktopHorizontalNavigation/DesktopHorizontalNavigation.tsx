import SiteLinkLogo from '../SiteLinkLogo/SiteLinkLogo'
import { useMemo } from 'react'
import MainMenu from '../MainMenu/MainMenu'
import DesktopHorizontalNavigationComponent
  from '@//:modules/content/Navigation/HorizontalNavigation/DesktopHorizontalNavigation/DesktopHorizontalNavigation'
import DesktopAlternativeMenu from './DesktopAlternativeMenu/DesktopAlternativeMenu'

export default function DesktopHorizontalNavigation (): JSX.Element {
  const MainMenuMemo = useMemo(() => <MainMenu />, [])

  const AlternativeMenuMemo = useMemo(() => <DesktopAlternativeMenu />, [])

  return (
    <DesktopHorizontalNavigationComponent>
      <DesktopHorizontalNavigationComponent.Left>
        <SiteLinkLogo />
      </DesktopHorizontalNavigationComponent.Left>
      <DesktopHorizontalNavigationComponent.Center>
        {MainMenuMemo}
      </DesktopHorizontalNavigationComponent.Center>
      <DesktopHorizontalNavigationComponent.Right>
        {AlternativeMenuMemo}
      </DesktopHorizontalNavigationComponent.Right>
    </DesktopHorizontalNavigationComponent>
  )
}
