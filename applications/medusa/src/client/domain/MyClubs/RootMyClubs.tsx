import { ReactNode, Suspense, useMemo } from 'react'
import VerticalNavigation from '@//:modules/content/VerticalNavigation/VerticalNavigation'
import { Trans } from '@lingui/macro'
import { BirdHouse, SettingCog } from '@//:assets/icons/navigation'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import SelectClubsQuery, { SelectClubsQuery as SelectClubsQueryType } from '@//:artifacts/SelectClubsQuery.graphql'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import SelectClubs from './SelectClubs/SelectClubs'
import { useLocation } from '@//:modules/routing'
import { Box, Skeleton } from '@chakra-ui/react'
import Redirect from '@//:modules/routing/Redirect'
import { useParams } from '@//:modules/routing/useParams'
import generatePath from '@//:modules/routing/generatePath'
import Button from '@//:modules/form/Button/Button'
import NavLink from '@//:modules/routing/NavLink'
import Icon from '../../../modules/content/Icon/Icon'
import { AddPlus } from '@//:assets/icons/interface'

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
      <VerticalNavigation.Content>
        <Box>
          <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
            <Suspense fallback={<Skeleton borderRadius='sm' h={16} />}>
              <SelectClubs query={queryRef as PreloadedQuery<SelectClubsQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Box>
        <NavLink exact to={`${basePath}/create-post`}>
          {({ isActive }) => (
            <Button
              leftIcon={
                <Icon
                  icon={AddPlus}
                  w={4}
                  h={4}
                  fill={isActive ? 'gray.100' : 'teal.900'}
                />
              }
              w='100%'
              colorScheme={isActive ? 'gray' : 'teal'}
              size='lg'
            >
              <Trans>Create a Post</Trans>
            </Button>
          )}
        </NavLink>
        <VerticalNavigation.Button
          to={`${basePath}/home`}
          exact
          colorScheme='teal'
          title={
            <Trans>Home</Trans>
          }
          icon={BirdHouse}
        />
        <VerticalNavigation.Button
          to={`${basePath}/settings`}
          exact
          colorScheme='teal'
          title={
            <Trans>Settings</Trans>
          }
          icon={SettingCog}
        />
        <NavLink exact to={clubPage}>
          {({ isActive }) => (
            <Button w='100%' size='sm' variant='ghost' colorScheme='gray'>
              <Trans>View Public Club Page</Trans>
            </Button>
          )}
        </NavLink>
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {location.pathname === basePath ? <Redirect to={`${basePath}/home`} /> : props.children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
