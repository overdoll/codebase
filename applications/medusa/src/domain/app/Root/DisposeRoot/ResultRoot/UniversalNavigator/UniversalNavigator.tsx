import DesktopHorizontalNavigation from './DesktopHorizontalNavigation/DesktopHorizontalNavigation'
import MobileHorizontalNavigation from './MobileHorizontalNavigation/MobileHorizontalNavigation'
import { RenderOnDesktop, RenderOnMobile } from '@//:modules/content/PageLayout'
import { useRouter } from 'next/router'

export default function UniversalNavigator (): JSX.Element | null {
  const router = useRouter()

  if (router.pathname === '/artists') {
    return null
  }

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
