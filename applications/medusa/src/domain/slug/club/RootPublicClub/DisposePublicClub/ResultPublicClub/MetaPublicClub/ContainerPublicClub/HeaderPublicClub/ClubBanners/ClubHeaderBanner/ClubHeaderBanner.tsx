import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubHeaderBannerFragment$key } from '@//:artifacts/ClubHeaderBannerFragment.graphql'
import { Box, Flex } from '@chakra-ui/react'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import LargeClubHeader
  from '../../../../../../../../../../club/home/RootClubHome/ClubHome/LargeClubHeader/LargeClubHeader'
import ClubBanner from '@//:modules/content/PageLayout/Display/fragments/Banner/ClubBanner/ClubBanner'

interface Props {
  query: ClubHeaderBannerFragment$key
}

const Fragment = graphql`
  fragment ClubHeaderBannerFragment on Club {
    ...ClubBannerFragment
    ...LargeClubHeaderFragment
  }
`

export default function ClubHeaderBanner ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Box h={200}>
      <TileOverlay
        backdrop={<ClubBanner clubQuery={data} />}
      >
        <Flex w='100%' h='100%' align='center' justify='center'>
          <LargeClubHeader query={data} />
        </Flex>
      </TileOverlay>
    </Box>
  )
}
