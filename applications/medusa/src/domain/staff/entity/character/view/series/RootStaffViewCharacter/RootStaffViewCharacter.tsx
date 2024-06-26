import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  StaffViewCharacterQuery as StaffViewCharacterQueryType
} from '@//:artifacts/StaffViewCharacterQuery.graphql'
import StaffViewCharacterQuery from '@//:artifacts/StaffViewCharacterQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Stack } from '@chakra-ui/react'
import StaffViewCharacter from './StaffViewCharacter/StaffViewCharacter'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffViewCharacterQuery: PreloadedQuery<StaffViewCharacterQueryType>
  }
}

const RootStaffViewCharacter: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffViewCharacterQuery,
    props.queryRefs.staffViewCharacterQuery
  )

  const {
    query: {
      slug,
      seriesSlug
    }
  } = useRouter()

  return (
    <>
      <Head>
        <title>
          View Character - Staff · overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton href='/staff/entity/character/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({
            slug: slug as string,
            seriesSlug: seriesSlug as string
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

export default RootStaffViewCharacter
