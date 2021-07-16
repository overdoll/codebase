/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect, Suspense } from 'react'
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
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
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
  const [queryRef, loadQuery] = useQueryLoader<RootQuery>(
    generalSettingsGQL,
    props.profileQuery
  )

  useEffect(() => {
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
              <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
            )}
          >
            <Suspense fallback={null}>
              {queryRef != null
                ? <Content query={generalSettingsGQL} queryRef={queryRef} loadQuery={loadQuery} />
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

const Content = ({ query, queryRef, loadQuery }) => {
  const [t] = useTranslation('settings')

  const data = usePreloadedQuery<RootQuery>(
    query,
    queryRef
  )

  return (

    <Stack spacing={8}>
      <Button onClick={loadQuery} />
      <Flex direction='column'>
        <Username
          username={data.authenticatedAccount.username} usernames={data.accountSettings.general.usernames}
          refresh={loadQuery}
        />
      </Flex>
      <Flex direction='column'>
        <Emails emails={data.accountSettings.general.emails} />
      </Flex>
    </Stack>
  )
}
