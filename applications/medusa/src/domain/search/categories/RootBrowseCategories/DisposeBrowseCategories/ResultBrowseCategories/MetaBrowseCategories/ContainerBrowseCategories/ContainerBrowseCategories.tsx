import dynamic from 'next/dynamic'
import { ContainerBrowseCategoriesFragment$key } from '@//:artifacts/ContainerBrowseCategoriesFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Suspense } from 'react'
import { ContentContainer } from '@//:modules/content/PageLayout'
import ScrollBrowseCategories from './ScrollBrowseCategories/ScrollBrowseCategories'
import { Stack } from '@chakra-ui/react'
import { CategoryIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'

const LazyBanner = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseBanner/JoinBrowseBanner')
  },
  { suspense: true }
)

const LazyModal = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseModal/JoinBrowseModal')
  },
  { suspense: true }
)

interface Props {
  rootQuery: ContainerBrowseCategoriesFragment$key
}

const Fragment = graphql`
  fragment ContainerBrowseCategoriesFragment on Query {
    viewer {
      __typename
    }
    ...ScrollBrowseCategoriesFragment
  }
`

export default function ContainerBrowseCategories (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(Fragment, rootQuery)

  return (
    <>
      <Suspense fallback={<></>}>
        {data.viewer == null && (
          <>
            <LazyBanner />
            <LazyModal />
          </>
        )}
      </Suspense>
      <ContentContainer pt={2}>
        <Stack spacing={2}>
          <PageHeader icon={CategoryIdentifier} title={<Trans>Browse categories</Trans>} />
          <ScrollBrowseCategories query={data} />
        </Stack>
      </ContentContainer>
    </>
  )
}
