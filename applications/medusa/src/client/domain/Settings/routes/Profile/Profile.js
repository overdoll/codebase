/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect, Suspense, useCallback } from 'react'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import { Helmet } from 'react-helmet-async'
import {
  Center,
  Flex,
  Spinner, Stack
} from '@chakra-ui/react'
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
              {queryRef === null
                ? <Flex justify='center'>
                  <Spinner size='lg' color='red.500' />
                </Flex>
                : <Content query={generalSettingsGQL} queryRef={queryRef} refresh={refresh} />}
            </Suspense>
          </ErrorBoundary>
        </Flex>
      </Center>
    </>
  )
}

const Content = (props) => {
  const data = usePreloadedQuery<ProfileSettingsQuery>(
    props.query,
    props.queryRef
  )

  return (
    <Stack spacing={8}>
      <Flex direction='column'>
        <Username
          username={data.authenticatedAccount.username} usernames={data.accountSettings.general.usernames}
          refresh={props.refresh}
        />
      </Flex>
      <Flex direction='column'>
        <Emails refresh={props.refresh} emails={data.accountSettings.general.emails} />
      </Flex>
    </Stack>
  )
}
