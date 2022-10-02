import { RenderOnDesktop } from '@//:modules/content/PageLayout'
import SiteLinkLogo from '../SiteLinkLogo/SiteLinkLogo'
import { graphql, useFragment } from 'react-relay/hooks'
import { DesktopHorizontalNavigationFragment$key } from '@//:artifacts/DesktopHorizontalNavigationFragment.graphql'
import { useMemo } from 'react'
import MainMenu from '../MainMenu/MainMenu'
import DesktopHorizontalNavigationComponent
  from '@//:modules/content/Navigation/HorizontalNavigation/DesktopHorizontalNavigation/DesktopHorizontalNavigation'
import DesktopAlternativeMenu from '../AlternativeMenu/DesktopAlternativeMenu/DesktopAlternativeMenu'

interface Props {
  query: DesktopHorizontalNavigationFragment$key | null
}

const Fragment = graphql`
  fragment DesktopHorizontalNavigationFragment on Account {
    id
    ...DesktopAlternativeMenuFragment
    ...NavigationPopupFragment
  }
`

export default function DesktopHorizontalNavigation (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const MainMenuMemo = useMemo(() => <MainMenu />, [data?.id])

  const AlternativeMenuMemo = useMemo(() => <DesktopAlternativeMenu query={data} />, [data?.id])

  return (
    <DesktopHorizontalNavigationComponent>
      <DesktopHorizontalNavigationComponent.Left>
        <RenderOnDesktop>
          <SiteLinkLogo />
        </RenderOnDesktop>
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
