/**
 * @flow
 */

import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Center, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { useQueryLoader } from 'react-relay/hooks'
import RecoveryCodesSetupQuery from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import type { RecoveryCodesSetupQuery as RecoveryCodesSetupQueryType } from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import RecoveryCodesSetup from './RecoveryCodesSetup/RecoveryCodesSetup'
import Button from '@//:modules/form/Button'
import Link from '@//:modules/routing/Link'
import Icon from '@//:modules/content/Icon/Icon'
import ArrowLeft1 from '@streamlinehq/streamlinehq/img/streamline-bold/arrows-diagrams/arrows/arrow-left-1.svg'

type Props = {
  prepared: {
    recoveryCodesQuery: RecoveryCodesSetupQueryType
  }

}

export default function RootRecoveryCodesSetup (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    RecoveryCodesSetupQuery,
    props.prepared.recoveryCodesQuery
  )

  const [t] = useTranslation('configure')

  return (
    <>
      <Helmet title='recovery setup' />
      <Center mt={8}>
        <Flex
          w={['full', 'sm', 'md', 'lg']}
          pl={[1, 0]}
          pr={[1, 0]}
          direction='column'
          mb={6}
        >
          <Heading fontSize='xl' color='gray.00'>{t('recovery_codes.title')}</Heading>
          <Divider borderColor='gray.500' mt={1} mb={1} />
          <Text mb={3} fontSize='sm' color='gray.100'>{t('recovery_codes.description')}</Text>
          <Suspense fallback={<SkeletonStack />}>
            <ErrorBoundary
              fallback={({ error, reset }) => (
                <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
              )}
            >
              <RecoveryCodesSetup query={queryRef} />
            </ErrorBoundary>
          </Suspense>
          <Divider borderColor='gray.500' mt={3} mb={3} />
          <Link to='/settings/security'>
            <Button
              leftIcon={<Icon w={3} h={3} icon={ArrowLeft1} fill='gray.100' />}
              variant='link'
            >{t('recovery_codes.back')}
            </Button>
          </Link>
        </Flex>
      </Center>
    </>
  )
}
