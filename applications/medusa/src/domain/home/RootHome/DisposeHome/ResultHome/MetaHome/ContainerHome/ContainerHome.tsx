import { ContainerHomeFragment$key } from '@//:artifacts/ContainerHomeFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import BoxesHome from './BoxesHome/BoxesHome'
import SecondaryBoxesHome from './SecondaryBoxesHome/SecondaryBoxesHome'
import SecondarySuggestedHome from './SecondarySuggestedHome/SecondarySuggestedHome'
import SuggestedHome from './SuggestedHome/SuggestedHome'
import UrlCurationProfile from './UrlCurationProfile/UrlCurationProfile'
import { Stack } from '@chakra-ui/react'

interface Props {
  rootQuery: ContainerHomeFragment$key
}

const LazyBanner = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseBanner/JoinBrowseBanner')
  },
  { suspense: true }
)

const Fragment = graphql`
  fragment ContainerHomeFragment on Query {
    ...SuggestedHomeFragment
    ...SecondarySuggestedHomeFragment
    viewer {
      ...SecondaryBoxesHomeFragment
      ...UrlCurationProfileFragment
    }
  }
`

export default function ContainerHome (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(Fragment, rootQuery)

  return (
    <ContentContainer pt={2}>
      <Stack spacing={36} mb={36}>
        <BoxesHome />
        <SuggestedHome rootQuery={data} />
        <SecondaryBoxesHome viewerQuery={data.viewer} />
        <SecondarySuggestedHome rootQuery={data} />
      </Stack>
      <UrlCurationProfile viewerQuery={data.viewer} />
      <Suspense fallback={<></>}>
        {data.viewer == null && (
          <LazyBanner />
        )}
      </Suspense>
    </ContentContainer>
  )
}
