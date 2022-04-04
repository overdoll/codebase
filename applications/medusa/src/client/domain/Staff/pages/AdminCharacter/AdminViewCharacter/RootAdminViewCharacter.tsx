import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  StaffViewCharacterQuery as StaffViewCharacterQueryType
} from '@//:artifacts/StaffViewCharacterQuery.graphql'
import StaffViewCharacterQuery from '@//:artifacts/StaffViewCharacterQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { Stack } from '@chakra-ui/react'
import StaffViewCharacter from './StaffViewCharacter/StaffViewCharacter'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import BackButton from '../../../../../../modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  prepared: {
    query: PreloadedQuery<StaffViewCharacterQueryType>
  }
}

export default function RootStaffViewCharacter (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffViewCharacterQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='view character' />
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton to='/staff/character/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({
            slug: match.slug as string,
            seriesSlug: match.seriesSlug as string
          })}
          >
            <Suspense fallback={<SkeletonStack />}>
              <StaffViewCharacter query={queryRef as PreloadedQuery<StaffViewCharacterQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
