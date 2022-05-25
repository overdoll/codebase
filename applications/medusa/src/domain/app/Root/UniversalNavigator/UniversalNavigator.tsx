import HorizontalNavigation from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigation'
import SiteLinkLogo from './SiteLinkLogo/SiteLinkLogo'
import MainMenu from './MainMenu/MainMenu'
import { graphql, useFragment } from 'react-relay/hooks'
import AlternativeMenu from './AlternativeMenu/AlternativeMenu'
import { UniversalNavigatorFragment$key } from '@//:artifacts/UniversalNavigatorFragment.graphql'
import { RenderOnDesktop, RenderOnMobile } from '@//:modules/content/PageLayout'

interface Props {
  queryRef: UniversalNavigatorFragment$key | null
}

const UniversalNavigatorGQL = graphql`
  fragment UniversalNavigatorFragment on Account {
    ...AlternativeMenuFragment
  }
`

export default function UniversalNavigator ({ queryRef }: Props): JSX.Element {
  const data = useFragment(UniversalNavigatorGQL, queryRef)

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
            <MainMenu />
          </HorizontalNavigation.Center>
          <HorizontalNavigation.Right>
            <AlternativeMenu queryRef={data} />
          </HorizontalNavigation.Right>
        </HorizontalNavigation>
      </RenderOnDesktop>
      <RenderOnMobile>
        <HorizontalNavigation>
          <HorizontalNavigation.Center>
            <MainMenu />
            <AlternativeMenu queryRef={data} />
          </HorizontalNavigation.Center>
        </HorizontalNavigation>
      </RenderOnMobile>
    </>
  )
}
