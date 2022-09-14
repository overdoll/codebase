import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubHeaderBannerFragment$key } from '@//:artifacts/ClubHeaderBannerFragment.graphql'
import { Box, Flex } from '@chakra-ui/react'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import LargeClubHeader from '../../../../../../../../../../club/home/RootClubHome/ClubHome/LargeClubHeader/LargeClubHeader'

interface Props {
  query: ClubHeaderBannerFragment$key
}

const Fragment = graphql`
  fragment ClubHeaderBannerFragment on Club {
    id
    banner {
      ...ResourceItemFragment
    }
    ...LargeClubHeaderFragment
  }
`

export default function ClubHeaderBanner ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Box h={200}>
      <TileOverlay
        backdrop={(
          <ResourceItem
            showBorder
            seed={data.id}
            query={data.banner ?? null}
          />)}
      >
        <Flex w='100%' h='100%' align='center' justify='center'>
          <LargeClubHeader query={data} />
        </Flex>
      </TileOverlay>
    </Box>
  )
}
