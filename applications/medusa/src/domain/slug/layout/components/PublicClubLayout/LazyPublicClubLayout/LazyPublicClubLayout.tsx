import { LazyArgumentsProps } from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import { graphql } from 'react-relay'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { LazyPublicClubLayoutQuery } from '@//:artifacts/LazyPublicClubLayoutQuery.graphql'
import React, { Suspense } from 'react'
import { ContentContainer } from '@//:modules/content/PageLayout'
import { PublicClubLayoutLazyProps } from '../PublicClubLayout'
import SupportPublicClub from './SupportPublicClub/SupportPublicClub'
import HeaderPublicClub from './HeaderPublicClub/HeaderPublicClub'
import { Stack } from '@chakra-ui/react'
import BannerPublicClub from './BannerPublicClub/BannerPublicClub'
import dynamic from 'next/dynamic'

const LazyModal = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseModal/JoinBrowseModal')
  },
  { suspense: true }
)

const LazyBanner = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseBanner/JoinBrowseBanner')
  },
  { suspense: true }
)

interface Props extends LazyArgumentsProps<PublicClubLayoutLazyProps> {
}

const Query = graphql`
  query LazyPublicClubLayoutQuery($slug: String!) {
    club(slug: $slug) {
      ...SupportPublicClubFragment
      ...HeaderPublicClubFragment
      ...BannerPublicClubFragment
    }
    viewer {
      ...HeaderPublicClubViewerFragment
      ...SupportPublicClubViewerFragment
    }
  }
`

export default function LazyPublicClubLayout (props: Props): JSX.Element {
  const {
    lazyArguments: {
      variables,
      options
    }
  } = props

  const data = useLazyLoadQuery<LazyPublicClubLayoutQuery>(Query, variables, options)

  if (data.club == null) {
    return <></>
  }

  return (
    <>
      <BannerPublicClub clubQuery={data.club} />
      <ContentContainer pt={4}>
        <Stack spacing={8}>
          <HeaderPublicClub clubQuery={data.club} viewerQuery={data.viewer} />
          <SupportPublicClub clubQuery={data.club} viewerQuery={data.viewer} />
        </Stack>
      </ContentContainer>
      <Suspense fallback={<></>}>
        {data.viewer == null && (
          <>
            <LazyBanner />
            <LazyModal />
          </>
        )}
      </Suspense>
    </>
  )
}
