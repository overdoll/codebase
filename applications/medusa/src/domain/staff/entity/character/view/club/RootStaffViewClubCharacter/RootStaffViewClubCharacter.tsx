import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  StaffViewClubCharacterQuery as StaffViewClubCharacterQueryType
} from '@//:artifacts/StaffViewClubCharacterQuery.graphql'
import StaffViewClubCharacterQuery from '@//:artifacts/StaffViewClubCharacterQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Stack } from '@chakra-ui/react'
import StaffViewClubCharacter from './StaffViewClubCharacter/StaffViewClubCharacter'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffViewClubCharacterQuery: PreloadedQuery<StaffViewClubCharacterQueryType>
  }
}

const RootStaffViewClubCharacter: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffViewClubCharacterQuery,
    props.queryRefs.staffViewClubCharacterQuery
  )

  const {
    query: {
      slug,
      clubSlug
    }
  } = useRouter()

  return (
    <>
      <Head>
        <title>
          View Club Character - Staff · overdoll.com
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
            clubSlug: clubSlug as string
          })}
          >
            <Suspense fallback={<SkeletonStack />}>
              <StaffViewClubCharacter query={queryRef as PreloadedQuery<StaffViewClubCharacterQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default RootStaffViewClubCharacter
