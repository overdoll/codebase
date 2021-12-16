import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import SiteLinkLogo from './SiteLinkLogo/SiteLinkLogo'
import MainMenu from './MainMenu/MainMenu'
import { useLocation } from '@//:modules/routing'
import getBasePath from '@//:modules/routing/getBasePath'
import { graphql, useFragment } from 'react-relay/hooks'
import AlternativeMenu from './AlternativeMenu/AlternativeMenu'
import { UniversalNavigatorFragment$key } from '@//:artifacts/UniversalNavigatorFragment.graphql'

interface Props {
  queryRef: UniversalNavigatorFragment$key | null
}

const UniversalNavigatorGQL = graphql`
  fragment UniversalNavigatorFragment on Account {
    ...AlternativeMenuFragment
  }
`

// on these routes, the nav is simplified (main items hidden)
const hidden = [
  '/join',
  '/verify-token'
]

export default function UniversalNavigator ({ queryRef }: Props): JSX.Element {
  const location = useLocation()

  const isHidden = hidden.includes(getBasePath(location.pathname))

  const data = useFragment(UniversalNavigatorGQL, queryRef)

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
        <AlternativeMenu queryRef={data} />
      </HorizontalNavigation.Right>
    </HorizontalNavigation>
  )
}
