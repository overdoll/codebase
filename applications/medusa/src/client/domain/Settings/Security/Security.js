/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Center, Flex } from '@chakra-ui/react'
import RootMultiFactor from './RootMultiFactor/RootMultiFactor'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { MultiFactorQuery } from '@//:artifacts/MultiFactorQuery.graphql'

type Props = {
  prepared: {
    multiFactorQuery: PreloadedQueryInner<MultiFactorQuery>,
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
          <RootMultiFactor query={props.prepared.multiFactorQuery} />
        </Flex>
      </Center>
    </>
  )
}
