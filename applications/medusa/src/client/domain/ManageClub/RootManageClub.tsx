import { ReactNode, Suspense, useMemo } from 'react'
import VerticalNavigation from '@//:modules/content/VerticalNavigation/VerticalNavigation'
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
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import SelectClubs from './components/SelectClubs/SelectClubs'
import { useLocation } from '@//:modules/routing'
import { Box, Skeleton } from '@chakra-ui/react'
import Redirect from '@//:modules/routing/Redirect'
import { useParams } from '@//:modules/routing/useParams'
import generatePath from '@//:modules/routing/generatePath'
import PageContents from '../Root/PageContents/PageContents'

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
    <VerticalNavigation>
      <VerticalNavigation.Content
        title={<Trans>
          Manage Club
        </Trans>}
        outsideElements={<Box h={16}>
          <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
            <Suspense fallback={<Skeleton borderRadius='sm' h='100%' />}>
              <SelectClubs query={queryRef as PreloadedQuery<SelectClubsQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
                         </Box>}
      >
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
        <VerticalNavigation.Button
          to={`${basePath}/home`}
          exact
          title={
            <Trans>Home</Trans>
            }
          icon={BirdHouse}
        />
        <VerticalNavigation.Button
          to={`${basePath}/posts`}
          exact
          title={
            <Trans>Posts</Trans>
            }
          icon={FileMultiple}
        />
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
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {location.pathname === basePath ? <Redirect to={`${basePath}/home`} /> : props.children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
