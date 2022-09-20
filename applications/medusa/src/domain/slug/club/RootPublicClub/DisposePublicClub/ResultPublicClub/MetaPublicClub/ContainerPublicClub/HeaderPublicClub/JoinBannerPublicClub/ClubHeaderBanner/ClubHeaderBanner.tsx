import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubHeaderBannerFragment$key } from '@//:artifacts/ClubHeaderBannerFragment.graphql'
import { Heading, Stack } from '@chakra-ui/react'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import ClubBanner from '@//:modules/content/PageLayout/Display/fragments/Banner/ClubBanner/ClubBanner'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'

interface Props {
  query: ClubHeaderBannerFragment$key
}

const Fragment = graphql`
  fragment ClubHeaderBannerFragment on Club {
    name
    ...ClubIconFragment
    ...ClubBannerFragment
  }
`

export default function ClubHeaderBanner ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay
      backdrop={<ClubBanner clubQuery={data} />}
    >
      <Stack spacing={4} w='100%' h='100%' align='center' justify='center'>
        <ClubIcon size='xl' clubQuery={data} />
        <Heading
          fontSize='3xl'
          color='gray.00'
        >
          {data.name}
        </Heading>
      </Stack>
    </TileOverlay>
  )
}
