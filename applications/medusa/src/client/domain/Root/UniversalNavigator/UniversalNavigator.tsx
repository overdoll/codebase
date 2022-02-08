import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import SiteLinkLogo from './SiteLinkLogo/SiteLinkLogo'
import MainMenu from './MainMenu/MainMenu'
import { useLocation } from '@//:modules/routing'
import getBasePath from '@//:modules/routing/getBasePath'
import { graphql, useFragment } from 'react-relay/hooks'
import AlternativeMenu from './AlternativeMenu/AlternativeMenu'
import { UniversalNavigatorFragment$key } from '@//:artifacts/UniversalNavigatorFragment.graphql'
import { RenderOnDesktop, RenderOnMobile } from '@//:modules/content/PageLayout'
import { Box } from '@chakra-ui/react'

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
  '/confirm-email',
  '/verify-token'
]

export default function UniversalNavigator ({ queryRef }: Props): JSX.Element {
  const location = useLocation()

  const isHidden = hidden.includes(getBasePath(location.pathname))

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
          {!isHidden && (
            <HorizontalNavigation.Center>
              <MainMenu />
            </HorizontalNavigation.Center>
          )}
          <HorizontalNavigation.Right>
            <AlternativeMenu queryRef={data} />
          </HorizontalNavigation.Right>
        </HorizontalNavigation>
      </RenderOnDesktop>
      <RenderOnMobile>
        <HorizontalNavigation>
          {!isHidden
            ? (
              <HorizontalNavigation.Center>
                <MainMenu />
                <AlternativeMenu queryRef={data} />
              </HorizontalNavigation.Center>
              )
            : (
              <HorizontalNavigation.Center>
                <Box>
                  <AlternativeMenu queryRef={data} />
                </Box>
              </HorizontalNavigation.Center>
              )}
        </HorizontalNavigation>
      </RenderOnMobile>
    </>
  )
}
