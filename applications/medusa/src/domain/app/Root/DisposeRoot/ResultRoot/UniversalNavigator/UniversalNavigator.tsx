import DesktopHorizontalNavigation from './DesktopHorizontalNavigation/DesktopHorizontalNavigation'
import MobileHorizontalNavigation from './MobileHorizontalNavigation/MobileHorizontalNavigation'
import { RenderOnDesktop, RenderOnMobile } from '@//:modules/content/PageLayout'

export default function UniversalNavigator (): JSX.Element {
  return (
    <>
      <RenderOnDesktop>
        <DesktopHorizontalNavigation />
      </RenderOnDesktop>
      <RenderOnMobile>
        <MobileHorizontalNavigation />
      </RenderOnMobile>
    </>
  )
}
