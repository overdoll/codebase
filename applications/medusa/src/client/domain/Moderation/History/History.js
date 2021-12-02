/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Center, Flex, Heading, Table, Th, Thead, Tr, Stack, Grid, GridItem, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { AuditLogsQuery as AuditLogsQueryType } from '@//:artifacts/AuditLogsQuery.graphql'
import AuditLogsQuery from '@//:artifacts/AuditLogsQuery.graphql'
import AuditLogs from './AuditLogs/AuditLogs'
import { useQueryLoader } from 'react-relay/hooks'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import { PageWrapper, PageSectionTitle, PageSectionWrap, PageSectionDescription } from '@//:modules/content/PageLayout'

type Props = {
  prepared: {
    auditLogsQuery: PreloadedQueryInner<AuditLogsQueryType>,
  }
}

export default function History (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    AuditLogsQuery,
    props.prepared.auditLogsQuery
  )

  const [t] = useTranslation('moderation')

  return (
    <>
      <Helmet title='history' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle>
            {t('history.title')}
          </PageSectionTitle>
          <PageSectionDescription>
            {t('history.description')}
          </PageSectionDescription>
        </PageSectionWrap>
        <Stack>
          <Grid w='100%' templateColumns='repeat(8, 1fr)' gap={2}>
            <GridItem color='gray.200' colSpan={3}>
              <Text>
                {t('history.table.headers.date')}
              </Text>
            </GridItem>
            <GridItem color='gray.200' colSpan={3}>
              <Text>
                {t('history.table.headers.brand')}
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text color='gray.200'>
                {t('history.table.headers.status')}
              </Text>
            </GridItem>
            <GridItem colSpan={1} />
          </Grid>
          <Suspense fallback={<SkeletonStack />}>
            <ErrorBoundary
              fallback={({ error, reset }) => (
                <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
              )}
            >
              <AuditLogs query={queryRef} />
            </ErrorBoundary>
          </Suspense>
        </Stack>
      </PageWrapper>
    </>
  )
}
