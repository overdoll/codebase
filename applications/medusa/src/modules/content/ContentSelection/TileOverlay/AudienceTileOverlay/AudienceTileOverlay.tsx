import { Flex, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { AudienceTileOverlayFragment$key } from '@//:artifacts/AudienceTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'
import AudienceBanner from '../../../PageLayout/Display/fragments/Banner/AudienceBanner/AudienceBanner'

interface Props {
  query: AudienceTileOverlayFragment$key
}

const Fragment = graphql`
  fragment AudienceTileOverlayFragment on Audience {
    title
    ...AudienceBannerFragment
  }
`

export default function AudienceTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay
      backdrop={<AudienceBanner audienceQuery={data} />}
    >
      <Flex py={2} px={4} w='100%' h='100%' align='center' justify='center'>
        <Text
          fontSize='lg'
          color='gray.00'
          textAlign='center'
          noOfLines={4}
        >
          {data.title}
        </Text>
      </Flex>
    </TileOverlay>
  )
}
