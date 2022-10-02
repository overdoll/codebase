import { graphql, useFragment } from 'react-relay/hooks'
import { UniversalNavigatorFragment$key } from '@//:artifacts/UniversalNavigatorFragment.graphql'
import DesktopHorizontalNavigation from './DesktopHorizontalNavigation/DesktopHorizontalNavigation'
import MobileHorizontalNavigation from './MobileHorizontalNavigation/MobileHorizontalNavigation'
import { RenderOnDesktop, RenderOnMobile } from '@//:modules/content/PageLayout'

interface Props {
  queryRef: UniversalNavigatorFragment$key | null
}

const UniversalNavigatorGQL = graphql`
  fragment UniversalNavigatorFragment on Account {
    ...DesktopHorizontalNavigationFragment
    ...MobileHorizontalNavigationFragment
  }
`

export default function UniversalNavigator ({ queryRef }: Props): JSX.Element {
  const data = useFragment(UniversalNavigatorGQL, queryRef)

  return (
    <>
      <RenderOnDesktop>
        <DesktopHorizontalNavigation query={data} />
      </RenderOnDesktop>
      <RenderOnMobile>
        <MobileHorizontalNavigation query={data} />
      </RenderOnMobile>
    </>
  )
}
