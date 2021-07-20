/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect, Suspense, useState, useCallback } from 'react'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import { Helmet } from 'react-helmet-async'
import {
  Center,
  Flex,
  Spinner, Stack, Button
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { graphql, usePreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { ProfileSettingsQuery } from '@//:artifacts/ProfileSettingsQuery.graphql'
import ErrorFallback from '../../../../components/ErrorFallback/ErrorFallback'
import Username from './components/Username/Username'
import Emails from './components/Emails/Emails'

type Props = {
  profileQuery: PreloadedQueryInner<ProfileSettingsQuery>,
};

const generalSettingsGQL = graphql`
  query ProfileSettingsQuery {
    accountSettings {
      accountId
      general {
        emails {
          email
          status
        }
        usernames {
          username
        }
      }
    }
    authenticatedAccount{
      username
    }
  }
`

export default function Profile (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader<ProfileSettingsQuery>(
    generalSettingsGQL,
    props.profileQuery
  )

  useEffect(() => {
    loadQuery()
  }, [])

  const refresh = useCallback(() => {
    loadQuery()
  }, [])

  return (
    <>
      <Helmet title='profile' />

      <Center mt={8}>
        <Flex
          w={['full', 'sm', 'md', 'lg']}
          pl={[1, 0]}
          pr={[1, 0]}
          direction='column'
          mb={6}
        >
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <ErrorFallback error={error} reset={reset} refetch={refresh} />
            )}
          >
            <Suspense fallback={null}>
              {queryRef != null
                ? <Content query={generalSettingsGQL} queryRef={queryRef} refresh={refresh} />
                : <Flex justify='center'>
                  <Spinner size='lg' color='red.500' />
                </Flex>}
            </Suspense>
          </ErrorBoundary>
        </Flex>
      </Center>
    </>
  )
}

const Content = (props) => {
  const { query, queryRef, refresh } = props

  const data = usePreloadedQuery<ProfileSettingsQuery>(
    query,
    queryRef
  )

  return (
    <Stack spacing={8}>
      <Flex direction='column'>
        <Username
          username={data.authenticatedAccount.username} usernames={data.accountSettings.general.usernames}
          refresh={refresh}
        />
      </Flex>
      <Flex direction='column'>
        <Emails refresh={refresh} emails={data.accountSettings.general.emails} />
      </Flex>
    </Stack>
  )
}
