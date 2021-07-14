/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect, Suspense } from 'react'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import { Helmet } from 'react-helmet-async'
import { Center, Flex, Heading, Divider, Text, Button, Skeleton, Stack, Tooltip } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { graphql, usePreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
import ErrorFallback from '../../../../components/ErrorFallback/ErrorFallback'
import Icon from '@//:modules/content/icon/Icon'
import InterfaceAlertInformationCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/alerts/interface-alert-information-circle.svg'
import InfoTip from '../../../../components/InfoTip/InfoTip'

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
    authentication {
      account {
        username
      }
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

  const [t] = useTranslation('settings')

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
            <Suspense fallback={<Skeleton borderRadius={5} h='200px' />}>
              {queryRef != null
                ? <Content query={generalSettingsGQL} queryRef={queryRef} />
                : <><Skeleton borderRadius={5} h='200px' /></>}
            </Suspense>
          </ErrorBoundary>
        </Flex>
      </Center>
    </>
  )
}

const Content = ({ query, queryRef }) => {
  const data = usePreloadedQuery<RootQuery>(
    query,
    queryRef
  )

  const usernames = data.accountSettings.general.usernames

  console.log(usernames)

  return (
    <>
      <Heading size='lg' color='gray.00'>Username</Heading>
      <Divider borderColor='gray.500' mt={1} mb={3} />
      <Stack spacing={3}>
        <Flex direction='row' justify='space-between'>
          <Text fontSize='lg' color='gray.100'>{data.authentication.account.username}</Text>
          <Button size='sm'>Change Username</Button>
        </Flex>
        {usernames.length > 0 &&
          <Flex direction='column'>
            <Flex>
              <Heading size='sm' color='gray.100'>Previous Usernames</Heading>
              <InfoTip
                text='If a link with an old username is clicked, it will redirect to the new username. This behaviour may change in the future.'
                size={3}
              />
            </Flex>
            <Flex>
              <Text fontSize='sm' color='gray.200'>Any previous usernames you had under this account will show up
                here
              </Text>
            </Flex>
          </Flex>}
      </Stack>
      <Heading mt={8} size='lg' color='gray.00'>Emails</Heading>
      <Divider borderColor='gray.500' mt={1} mb={3} />
    </>
  )
}
