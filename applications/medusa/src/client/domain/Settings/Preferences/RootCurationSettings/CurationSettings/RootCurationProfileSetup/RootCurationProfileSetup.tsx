import { Helmet } from 'react-helmet-async'
import { Flex } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Skeleton/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type {
  CurationProfileSetupQuery as CurationProfileSetupQueryType
} from '@//:artifacts/CurationProfileSetupQuery.graphql'
import CurationProfileSetupQuery from '@//:artifacts/CurationProfileSetupQuery.graphql'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import Button from '@//:modules/form/Button/Button'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import CurationProfileSetup from './CurationProfileSetup/CurationProfileSetup'

interface Props {
  prepared: {
    curationQuery: PreloadedQuery<CurationProfileSetupQueryType>
  }
}

export default function RootMultiFactorTotpSetup (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    CurationProfileSetupQuery,
    props.prepared.curationQuery
  )

  return (
    <>
      <Helmet title='curation profile setup' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='green'>
            <Trans>
              Set up curation profile
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Tell us the type of content you want to see
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <CurationProfileSetup query={queryRef as PreloadedQuery<CurationProfileSetupQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
        <Flex justify='center'>
          <Link to='/settings/preferences'>
            <Button mt={8} size='sm' variant='link'>
              <Trans>
                Go back to settings
              </Trans>
            </Button>
          </Link>
        </Flex>
      </PageWrapper>
    </>
  )
}
