import { PreloadedQuery } from 'react-relay/hooks'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import SiteLinkLogo from './SiteLinkLogo/SiteLinkLogo'
import { RootQuery } from '@//:artifacts/RootQuery.graphql'
import QuickAccessMenu from './QuickAccessMenu/QuickAccessMenu'
import DryMenu from './DryMenu/DryMenu'
import { useLocation } from '@//:modules/routing'
import getBasePath from '@//:modules/routing/getBasePath'

interface Props {
  queryRef: PreloadedQuery<RootQuery>
}

// on these routes, the nav is simplified (main items hidden)
const hidden = [
  '/join',
  '/verify-token'
]

export default function UniversalNavigator ({ queryRef }: Props): JSX.Element {
  const location = useLocation()

  const isHidden = hidden.includes(getBasePath(location.pathname))

  return (
    <HorizontalNavigation transparent={isHidden}>
      <HorizontalNavigation.Left>
        <SiteLinkLogo invisible={isHidden} />
      </HorizontalNavigation.Left>
      {!isHidden && (
        <HorizontalNavigation.Center>
          <DryMenu />
        </HorizontalNavigation.Center>
      )}
      <HorizontalNavigation.Right>
        <QuickAccessMenu queryRef={queryRef} />
      </HorizontalNavigation.Right>
    </HorizontalNavigation>
  )
}
