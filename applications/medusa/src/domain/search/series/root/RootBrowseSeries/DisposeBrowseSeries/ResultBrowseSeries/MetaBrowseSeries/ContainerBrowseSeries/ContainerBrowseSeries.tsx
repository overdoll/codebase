import dynamic from 'next/dynamic'
import { ContainerBrowseSeriesFragment$key } from '@//:artifacts/ContainerBrowseSeriesFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Suspense } from 'react'
import { ContentContainer } from '@//:modules/content/PageLayout'
import ScrollBrowseSeries from './ScrollBrowseSeries/ScrollBrowseSeries'
import { Stack } from '@chakra-ui/react'
import { SeriesIdentifier } from '@//:assets/icons'
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
  rootQuery: ContainerBrowseSeriesFragment$key
}

const Fragment = graphql`
  fragment ContainerBrowseSeriesFragment on Query {
    viewer {
      __typename
    }
    ...ScrollBrowseSeriesFragment
  }
`

export default function ContainerBrowseSeries (props: Props): JSX.Element {
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
          <PageHeader icon={SeriesIdentifier} title={<Trans>Browse series</Trans>} />
          <ScrollBrowseSeries query={data} />
        </Stack>
      </ContentContainer>
    </>
  )
}
