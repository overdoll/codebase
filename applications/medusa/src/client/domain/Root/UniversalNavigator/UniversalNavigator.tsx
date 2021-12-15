import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import SiteLinkLogo from './SiteLinkLogo/SiteLinkLogo'
import MainMenu from './MainMenu/MainMenu'
import { useLocation } from '@//:modules/routing'
import getBasePath from '@//:modules/routing/getBasePath'
import { PreloadedQuery } from 'react-relay/hooks'
import { RootQuery } from '@//:artifacts/RootQuery.graphql'
import AlternativeMenu from './AlternativeMenu/AlternativeMenu'

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
          <MainMenu />
        </HorizontalNavigation.Center>
      )}
      <HorizontalNavigation.Right>
        <AlternativeMenu queryRef={queryRef} />
      </HorizontalNavigation.Right>
    </HorizontalNavigation>
  )
}
