import { ReactNode, Suspense, useMemo } from 'react'
import VerticalNavigation from '@//:modules/content/Navigation/VerticalNavigation/VerticalNavigation'
import { Trans } from '@lingui/macro'
import {
  BirdHouse,
  ContentBrushPen,
  FileMultiple,
  SettingCog,
  SettingHammer,
  UserHuman
} from '@//:assets/icons/navigation'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import SelectClubsQuery, { SelectClubsQuery as SelectClubsQueryType } from '@//:artifacts/SelectClubsQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SelectClubs from './components/SelectClubs/SelectClubs'
import { useLocation } from '@//:modules/routing'
import { Box, Skeleton } from '@chakra-ui/react'
import Redirect from '@//:modules/routing/Redirect'
import { useParams } from '@//:modules/routing/useParams'
import generatePath from '@//:modules/routing/generatePath'
import Can from '@//:modules/authorization/Can'
import { Helmet } from 'react-helmet-async'

interface Props {
  children: ReactNode
  prepared: {
    query: PreloadedQuery<SelectClubsQueryType>
  }
}

export default function RootManageClub (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    SelectClubsQuery,
    props.prepared.query
  )

  const location = useLocation()

  const match = useParams()

  const clubPage = `/${match.slug as string}`

  const basePath = useMemo((): string => {
    if (match?.slug == null) return ''

    return generatePath('/club/:slug', {
      slug: match.slug
    })
  }, [match])

  return (
    <>
      <Helmet>
        <title>
          Manage Club :: overdoll.com
        </title>
      </Helmet>
      <VerticalNavigation>
        <VerticalNavigation.Content
          title={
            <Trans>
              Manage Club
            </Trans>
          }
          outsideElements={
            <Box>
              <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
                <Suspense fallback={<Skeleton borderRadius='sm' h='100%' />}>
                  <SelectClubs query={queryRef as PreloadedQuery<SelectClubsQueryType>} />
                </Suspense>
              </QueryErrorBoundary>
            </Box>
          }
        >
          <Can I='create' a='Post'>
            <VerticalNavigation.Button
              to={`${basePath}/create-post`}
              exact
              buttonType='primary'
              colorScheme='teal'
              title={
                <Trans>Create a Post</Trans>
              }
              icon={ContentBrushPen}
            />
          </Can>
          <Can I='configure' a='Club'>
            <VerticalNavigation.Button
              to={`${basePath}/home`}
              exact
              title={
                <Trans>Home</Trans>
              }
              icon={BirdHouse}
            />
          </Can>
          <Can I='create' a='Post'>
            <VerticalNavigation.Button
              to={`${basePath}/posts`}
              exact
              title={
                <Trans>Posts</Trans>
              }
              icon={FileMultiple}
            />
          </Can>
          <Can I='configure' a='Club'>
            <VerticalNavigation.Button
              to={`${basePath}/members`}
              exact
              title={
                <Trans>Members</Trans>
              }
              icon={UserHuman}
            />
            <VerticalNavigation.Button
              to={`${basePath}/settings`}
              exact
              title={
                <Trans>Settings</Trans>
              }
              icon={SettingCog}
            />
            <VerticalNavigation.Button
              to={clubPage}
              isExternal
              exact
              title={
                <Trans>Club Page</Trans>
              }
              icon={SettingHammer}
            />
          </Can>
        </VerticalNavigation.Content>
        <VerticalNavigation.Page>
          {location.pathname === basePath ? <Redirect to={`${basePath}/home`} /> : props.children}
        </VerticalNavigation.Page>
      </VerticalNavigation>
    </>
  )
}
