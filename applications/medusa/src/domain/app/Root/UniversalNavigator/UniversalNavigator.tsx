import HorizontalNavigation from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigation'
import SiteLinkLogo from './SiteLinkLogo/SiteLinkLogo'
import MainMenu from './MainMenu/MainMenu'
import { graphql, useFragment } from 'react-relay/hooks'
import AlternativeMenu from './AlternativeMenu/AlternativeMenu'
import { UniversalNavigatorFragment$key } from '@//:artifacts/UniversalNavigatorFragment.graphql'
import { RenderOnDesktop, RenderOnMobile } from '@//:modules/content/PageLayout'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import SimpleNav from './SimpleNav/SimpleNav'
import NavigationPopup from './NavigationPopup/NavigationPopup'

interface Props {
  queryRef: UniversalNavigatorFragment$key | null
}

const UniversalNavigatorGQL = graphql`
  fragment UniversalNavigatorFragment on Account {
    id
    ...AlternativeMenuFragment
    ...NavigationPopupFragment
  }
`

export default function UniversalNavigator ({ queryRef }: Props): JSX.Element {
  const data = useFragment(UniversalNavigatorGQL, queryRef)

  const simpleNav = ['/roulette']

  const router = useRouter()

  const MainMenuMemo = useMemo(() => <MainMenu />, [data?.id])

  const AlternativeMenuMemo = useMemo(() => <AlternativeMenu queryRef={data} />, [data?.id])

  return (
    <>
      <RenderOnDesktop>
        <HorizontalNavigation>
          <HorizontalNavigation.Left>
            <RenderOnDesktop>
              <SiteLinkLogo />
            </RenderOnDesktop>
          </HorizontalNavigation.Left>
          <HorizontalNavigation.Center>
            {MainMenuMemo}
          </HorizontalNavigation.Center>
          <HorizontalNavigation.Right>
            {AlternativeMenuMemo}
          </HorizontalNavigation.Right>
        </HorizontalNavigation>
      </RenderOnDesktop>
      <RenderOnMobile>
        {simpleNav.includes(router.pathname)
          ? (
            <SimpleNav />
            )
          : (
            <HorizontalNavigation>
              <HorizontalNavigation.Center>
                {MainMenuMemo}
                {AlternativeMenuMemo}
              </HorizontalNavigation.Center>
            </HorizontalNavigation>
            )}
      </RenderOnMobile>
      <NavigationPopup query={data} />
    </>
  )
}
