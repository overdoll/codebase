/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Center, Flex } from '@chakra-ui/react'
import RootMultiFactorSettings from './RootMultiFactorSettings/RootMultiFactorSettings'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { MultiFactorSettingsQuery } from '@//:artifacts/MultiFactorSettingsQuery.graphql'

type Props = {
  prepared: {
    multiFactorQuery: PreloadedQueryInner<MultiFactorSettingsQuery>,
  }
};

export default function Security (props: Props): Node {
  return (
    <>
      <Helmet title='security' />
      <Center mt={8}>
        <Flex
          w={['full', 'sm', 'md', 'lg']}
          pl={[1, 0]}
          pr={[1, 0]}
          direction='column'
          mb={6}
        >
          <RootMultiFactorSettings query={props.prepared.multiFactorQuery} />
        </Flex>
      </Center>
    </>
  )
}
