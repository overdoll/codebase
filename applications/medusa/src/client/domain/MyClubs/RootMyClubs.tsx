import { ReactNode, Suspense } from 'react'
import VerticalNavigation from '@//:modules/content/VerticalNavigation/VerticalNavigation'
import { Trans } from '@lingui/macro'
import { ContentBookEdit } from '@//:assets/icons/navigation'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import SelectClubsQuery, { SelectClubsQuery as SelectClubsQueryType } from '@//:artifacts/SelectClubsQuery.graphql'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import SelectClubs from './SelectClubs/SelectClubs'
import { useLocation } from '@//:modules/routing'
import { generatePath, matchPath } from 'react-router'
import { Box } from '@chakra-ui/react'

interface Props {
  children: ReactNode
  prepared: {
    query: PreloadedQuery<SelectClubsQueryType>
  }
}

export default function RootMyClubs (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    SelectClubsQuery,
    props.prepared.query
  )

  const location = useLocation()

  const match = matchPath(location.pathname, {
    path: '/club/:slug'
  })

  const settingsPath = generatePath('/club/:slug/settings', {
    slug: match.params.slug
  })

  return (
    <VerticalNavigation>
      <VerticalNavigation.Content title={
        <Trans>
          My Clubs
        </Trans>
      }
      >
        <Box>
          <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.params.slug })}>
            <Suspense fallback={<SkeletonStack />}>
              <SelectClubs query={queryRef as PreloadedQuery<SelectClubsQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Box>
        <VerticalNavigation.Button
          to={settingsPath}
          exact
          colorScheme='teal'
          title={
            <Trans>Settings</Trans>
          }
          icon={ContentBookEdit}
        />
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {props.children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
