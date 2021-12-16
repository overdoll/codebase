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
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'

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
          <QueryErrorBoundary loadQuery={
            () => loadQuery({
              from: new Date(new Date().setDate(new Date().getDate() - 7)),
              to: new Date()
            })
          }
          >
            <Suspense fallback={<SkeletonStack />}>
              <AuditLogs query={queryRef as PreloadedQuery<AuditLogsQueryType>} />
            </Suspense>
          </QueryErrorBoundary>

        </Stack>
      </PageWrapper>
    </>
  )
}
