/**
 * @flow
 */

import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Center, CloseButton, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import MultiFactorTotpSetup from './MultiFactorTotpHeader/MultiFactorTotpHeader'
import { useQueryLoader } from 'react-relay/hooks'
import type { MultiFactorTotpHeaderQuery as MultiFactorTotpHeaderQueryType } from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import MultiFactorTotpHeaderQuery from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'

type Props = {
  prepared: {
    totpQuery: MultiFactorTotpHeaderQueryType
  }
}

export default function RootMultiFactorTotpSetup (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    MultiFactorTotpHeaderQuery,
    props.prepared.totpQuery
  )

  const [t] = useTranslation('configure')

  return (
    <>
      <Helmet title='authenticator setup' />
      <Center mt={8}>
        <Flex
          w={['full', 'sm', 'md', 'lg']}
          pl={[1, 0]}
          pr={[1, 0]}
          direction='column'
          mb={6}
        >
          <Flex justify='space-between' align='center'>
            <Heading fontSize='2xl' color='gray.00'>{t('totp.title')}</Heading>
            <Link to='/settings/security'>
              <CloseButton aria-label={t('recovery_codes.back')} />
            </Link>
          </Flex>
          <Divider borderColor='gray.500' mt={1} mb={1} />
          <Text mb={2} fontSize='md' color='gray.100'>{t('totp.description')}</Text>
          <Suspense fallback={<SkeletonStack />}>
            <ErrorBoundary
              fallback={({ error, reset }) => (
                <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
              )}
            >
              <MultiFactorTotpSetup query={queryRef} />
            </ErrorBoundary>
          </Suspense>

        </Flex>
      </Center>
    </>
  )
}
