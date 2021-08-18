/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Center, Flex } from '@chakra-ui/react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { QueueSettingsQuery } from '@//:artifacts/QueueSettingsQuery.graphql'
import RootQueueSettings from './RootQueueSettings/RootQueueSettings'

type Props = {
  prepared: {
    queueQuery: PreloadedQueryInner<QueueSettingsQuery>,
  }
};

export default function Moderation (props: Props): Node {
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
          <RootQueueSettings query={props.prepared.queueQuery} />
        </Flex>
      </Center>
    </>
  )
}
