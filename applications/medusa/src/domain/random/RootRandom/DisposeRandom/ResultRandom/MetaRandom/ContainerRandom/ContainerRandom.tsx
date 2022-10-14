import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerRandomFragment$key } from '@//:artifacts/ContainerRandomFragment.graphql'
import { ContainerRandomViewerFragment$key } from '@//:artifacts/ContainerRandomViewerFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import ScrollRandom from './ScrollRandom/ScrollRandom'
import { Stack } from '@chakra-ui/react'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import { RandomizeDice } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

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
  rootQuery: ContainerRandomFragment$key
  viewerQuery: ContainerRandomViewerFragment$key | null
}

const RootFragment = graphql`
  fragment ContainerRandomFragment on Query {
    ...ScrollRandomFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerRandomViewerFragment on Account {
    ...ScrollRandomViewerFragment
  }
`

export default function ContainerRandom (props: Props): JSX.Element {
  const {
    rootQuery,
    viewerQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <ContentContainer pt={2}>
      <Suspense fallback={<></>}>
        {viewerData == null && (
          <>
            <LazyModal />
            <LazyBanner />
          </>
        )}
      </Suspense>
      <Stack spacing={4}>
        <PageHeader icon={RandomizeDice} title={<Trans>Random posts</Trans>} />
        <ScrollRandom accountQuery={viewerData} rootQuery={rootData} />
      </Stack>
    </ContentContainer>
  )
}
