import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { Divider, Grid, GridItem, Stack, Text } from '@chakra-ui/react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { AuditLogsQuery as AuditLogsQueryType } from '@//:artifacts/AuditLogsQuery.graphql'
import AuditLogsQuery from '@//:artifacts/AuditLogsQuery.graphql'
import AuditLogs from './AuditLogs/AuditLogs'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import Head from 'next/head'

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

  return (
    <>
      <Head>
        <title>
          History - Moderation :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='purple'>
            <Trans>
              Moderation History
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Any moderation actions you take will appear here.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <Stack>
          <Grid w='100%' templateColumns='repeat(8, 1fr)' gap={2}>
            <GridItem color='gray.200' colSpan={3}>
              <Text>
                <Trans>
                  Date Posted
                </Trans>
              </Text>
            </GridItem>
            <GridItem color='gray.200' colSpan={3}>
              <Text>
                <Trans>
                  Club
                </Trans>
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text color='gray.200'>
                <Trans>
                  Status
                </Trans>
              </Text>
            </GridItem>
            <GridItem colSpan={1} />
          </Grid>
          <Divider borderColor='gray.500' borderWidth={1} />
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
