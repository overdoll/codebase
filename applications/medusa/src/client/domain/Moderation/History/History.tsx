import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { Grid, GridItem, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { AuditLogsQuery as AuditLogsQueryType } from '@//:artifacts/AuditLogsQuery.graphql'
import AuditLogsQuery from '@//:artifacts/AuditLogsQuery.graphql'
import AuditLogs from './AuditLogs/AuditLogs'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'

interface Props {
  prepared: {
    auditLogsQuery: PreloadedQuery<AuditLogsQueryType>
  }
}

export default function History (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    AuditLogsQuery,
    props.prepared.auditLogsQuery
  )

  const [t] = useTranslation('moderation')

  const refetch = (): void => {
    // TODO: assign proper refetch variables
    loadQuery({
      from: new Date(new Date().setDate(new Date().getDate() - 7)),
      to: new Date()
    })
  }

  if (queryRef == null) return null

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
              fallback={({
                error,
                reset
              }) => (
                <ErrorFallback
                  error={error}
                  reset={reset}
                  refetch={refetch}
                />
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
