import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import StaffCreateCharacterQuery, {
  StaffCreateCharacterQuery as StaffCreateCharacterQueryType
} from '@//:artifacts/StaffCreateCharacterQuery.graphql'
import StaffCreateCharacter from './StaffCreateCharacter/StaffCreateCharacter'
import { Trans } from '@lingui/macro'

interface Props {
  prepared: {
    query: PreloadedQuery<StaffCreateCharacterQueryType>
  }
}

export default function RootStaffCreateCharacter (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffCreateCharacterQuery,
    props.prepared.query
  )

  return (
    <>
      <Head>
        <title>
          Create Character - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <PageSectionTitle>
          <Trans>
            Create Character
          </Trans>
        </PageSectionTitle>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffCreateCharacter
              query={queryRef as PreloadedQuery<StaffCreateCharacterQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
