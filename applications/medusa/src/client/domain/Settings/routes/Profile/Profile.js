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
import Usernames from './components/Usernames/Usernames'
import Emails from './components/Emails/Emails'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'

type Props = {
  prepared: {
    stateQuery: PreloadedQueryInner<ProfileSettingsQuery>,
  }
};

const generalSettingsGQL = graphql`
  query ProfileSettingsQuery {
    viewer {
      ...UsernamesSettingsFragment
      ...EmailsSettingsFragment
    }
  }
`

export default function Profile (props: Props): Node {
  const data = usePreloadedQuery<ProfileSettingsQuery>(
    generalSettingsGQL,
    props.prepared.stateQuery
  )

  console.log(data)

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
          <Suspense fallback={<CenteredSpinner />}>
            <Stack spacing={8}>
              <Flex direction='column'>
                <Usernames
                  usernames={data?.usernames}
                />
              </Flex>
              <Flex direction='column'>
                <Emails emails={data?.emails} />
              </Flex>
            </Stack>
          </Suspense>
        </Flex>
      </Center>
    </>
  )
}
