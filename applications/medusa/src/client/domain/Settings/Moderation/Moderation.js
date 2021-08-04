/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Center, Flex } from '@chakra-ui/react'
import { Suspense } from 'react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { ModerationSettingsQuery } from '@//:artifacts/ModerationSettingsQuery.graphql'
import QueueSettings from './QueueSettings/QueueSettings'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'

type Props = {
  prepared: {
    stateQuery: PreloadedQueryInner<ModerationSettingsQuery>,
  }
};

const ModerationQuery = graphql`
  query ModerationSettingsQuery {
    ...QueueSettingsFragment
  }
`

export default function Moderation (props: Props): Node {
  const data = usePreloadedQuery<ModerationSettingsQuery>(
    ModerationQuery,
    props.prepared.stateQuery
  )

  return (
    <>
      <Helmet title='moderation' />
      <Center mt={8}>
        <Flex
          w={['full', 'sm', 'md', 'lg']}
          pl={[1, 0]}
          pr={[1, 0]}
          direction='column'
          mb={6}
        >
          <Suspense fallback={<CenteredSpinner />}>
            <QueueSettings account={data.viewer} />
          </Suspense>
        </Flex>
      </Center>
    </>
  )
}
