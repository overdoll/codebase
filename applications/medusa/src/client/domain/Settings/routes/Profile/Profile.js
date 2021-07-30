/**
 * @flow
 */
import type { Node } from 'react'
import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Center,
  Flex,
  Stack,
  useToast
} from '@chakra-ui/react'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { ProfileSettingsQuery } from '@//:artifacts/ProfileSettingsQuery.graphql'
import Usernames from './Usernames/Usernames'
import Emails from './Emails/Emails'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'

type Props = {
  prepared: {
    stateQuery: PreloadedQueryInner<ProfileSettingsQuery>,
  }
};

const generalSettingsGQL = graphql`
  query ProfileSettingsQuery($first: Int) {
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
                  usernames={data?.viewer}
                />
              </Flex>
              <Flex direction='column'>
                <Emails emails={data?.viewer} />
              </Flex>
            </Stack>
          </Suspense>
        </Flex>
      </Center>
    </>
  )
}
