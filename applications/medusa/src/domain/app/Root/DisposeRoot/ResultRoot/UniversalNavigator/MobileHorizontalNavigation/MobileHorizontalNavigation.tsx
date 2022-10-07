import { useMemo } from 'react'
import MainMenu from '../MainMenu/MainMenu'
import MobileHorizontalNavigationComponent
  from '@//:modules/content/Navigation/HorizontalNavigation/MobileHorizontalNavigation/MobileHorizontalNavigation'
import MobileAlternativeMenu from './MobileAlternativeMenu/MobileAlternativeMenu'

export default function MobileHorizontalNavigation (): JSX.Element {
  const MainMenuMemo = useMemo(() => <MainMenu />, [])

  const AlternativeMenuMemo = useMemo(() => <MobileAlternativeMenu />, [])

  return (
    <MobileHorizontalNavigationComponent>
      <MobileHorizontalNavigationComponent.Center>
        {MainMenuMemo}
        {AlternativeMenuMemo}
      </MobileHorizontalNavigationComponent.Center>
    </MobileHorizontalNavigationComponent>
  )
}
