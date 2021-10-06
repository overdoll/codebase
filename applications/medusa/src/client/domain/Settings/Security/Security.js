/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Center, Flex } from '@chakra-ui/react'
import RootMultiFactorSettings from './RootMultiFactorSettings/RootMultiFactorSettings'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { MultiFactorSettingsQuery } from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import { PageWrapper } from '../../../components/PageLayout'

type Props = {
  prepared: {
    multiFactorQuery: PreloadedQueryInner<MultiFactorSettingsQuery>,
  }
};

export default function Security (props: Props): Node {
  return (
    <>
      <Helmet title='security settings' />
      <PageWrapper>
        <RootMultiFactorSettings query={props.prepared.multiFactorQuery} />
      </PageWrapper>
    </>
  )
}
