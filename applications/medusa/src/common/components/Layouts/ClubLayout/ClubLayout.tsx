import type { ReactNode } from 'react'
import { Suspense } from 'react'
import VerticalNavigation from '@//:modules/content/Navigation/VerticalNavigation/VerticalNavigation'
import {
  BirdHouse,
  ContentBrushPen,
  FileMultiple,
  SettingCog,
  SettingHammer,
  SubscriptionIdentifier,
  CharacterIdentifier
} from '@//:assets/icons'
import Can from '@//:modules/authorization/Can'
import { Trans } from '@lingui/macro'
import { Box, Skeleton, useUpdateEffect } from '@chakra-ui/react'
import QueryErrorBoundary from '../../../../modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SelectClubs from './SelectClubs/SelectClubs'
import { useRouter } from 'next/router'
import { useSearch } from '@//:modules/content/HookedComponents/Search'

interface Props {
  children: ReactNode
}

interface SearchProps {
  slug: string
}

export default function ClubLayout ({ children }: Props): JSX.Element {
  const { query: { slug } } = useRouter()

  const {
    searchArguments,
    loadQuery,
    changeArguments
  } = useSearch<SearchProps>({
    defaultValue: {
      slug: slug as string
    }
  })

  useUpdateEffect(() => {
    changeArguments({
      slug: slug as string
    })
  }, [slug])

  return (
    <>

      <VerticalNavigation>
        <VerticalNavigation.Content
          title={
            <Trans>
              Manage Club
            </Trans>
          }
          outsideElements={
            <Box>
              <QueryErrorBoundary loadQuery={loadQuery}>
                <Suspense fallback={<Skeleton borderRadius='sm' h='100%' />}>
                  <SelectClubs searchArguments={searchArguments} />
                </Suspense>
              </QueryErrorBoundary>
            </Box>
          }
        >
          <Can I='create' a='Post'>
            <VerticalNavigation.Button
              href={{
                pathname: '/club/[slug]/create-post',
                query: { slug: slug }
              }}
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
              href={{
                pathname: '/club/[slug]/home',
                query: { slug: slug }
              }}
              title={
                <Trans>Home</Trans>
              }
              icon={BirdHouse}
            />
            <VerticalNavigation.Button
              href={{
                pathname: '/club/[slug]/revenue',
                query: { slug: slug }
              }}
              title={
                <Trans>Revenue</Trans>
              }
              icon={SubscriptionIdentifier}
            />
          </Can>
          <Can I='create' a='Post'>
            <VerticalNavigation.Button
              href={{
                pathname: '/club/[slug]/posts',
                query: { slug: slug }
              }}
              title={
                <Trans>Posts</Trans>
              }
              icon={FileMultiple}
            />
            <VerticalNavigation.Button
              href={{
                pathname: '/club/[slug]/characters',
                query: { slug: slug }
              }}
              title={
                <Trans>Characters</Trans>
              }
              icon={CharacterIdentifier}
            />
          </Can>
          <Can I='configure' a='Club'>
            <VerticalNavigation.Button
              href={{
                pathname: '/club/[slug]/settings',
                query: { slug: slug }
              }}
              title={
                <Trans>Settings</Trans>
              }
              icon={SettingCog}
            />
            <VerticalNavigation.Button
              href={{
                pathname: '/[slug]',
                query: { slug: slug }
              }}
              isExternal
              title={
                <Trans>Club Page</Trans>
              }
              icon={SettingHammer}
            />
          </Can>
        </VerticalNavigation.Content>
        <VerticalNavigation.Page>
          {children}
        </VerticalNavigation.Page>
      </VerticalNavigation>
    </>
  )
}
