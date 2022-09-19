import { Heading, Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { ClubTileOverlayFragment$key } from '@//:artifacts/ClubTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'
import ClubIcon from '../../../PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'
import ClubBanner from '../../../PageLayout/Display/fragments/Banner/ClubBanner/ClubBanner'

interface Props {
  query: ClubTileOverlayFragment$key
}

const Fragment = graphql`
  fragment ClubTileOverlayFragment on Club {
    name
    ...ClubIconFragment
    ...ClubBannerFragment
  }
`

export default function ClubTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay
      backdrop={<ClubBanner clubQuery={data} />}
    >
      <Stack p={2} w='100%' spacing={2} h='100%' align='center' justify='center'>
        <ClubIcon clubQuery={data} />
        <Heading
          textAlign='center'
          color='gray.00'
          noOfLines={3}
          fontSize={{
            base: 'sm',
            md: 'md'
          }}
        >
          {data.name}
        </Heading>
      </Stack>
    </TileOverlay>
  )
}
