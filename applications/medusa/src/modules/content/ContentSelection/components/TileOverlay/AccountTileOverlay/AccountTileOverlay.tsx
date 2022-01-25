import { Flex, Text } from '@chakra-ui/react'
import ResourceItem from '../../../../DataDisplay/ResourceItem/ResourceItem'
import { graphql, useFragment } from 'react-relay/hooks'
import { AccountTileOverlayFragment$key } from '@//:artifacts/AccountTileOverlayFragment.graphql'
import { TileOverlay } from '../../../index'
import { ResourceIcon } from '../../../../PageLayout'

interface Props {
  query: AccountTileOverlayFragment$key
}

const Fragment = graphql`
  fragment AccountTileOverlayFragment on Account {
    avatar {
      ...ResourceIconFragment
      ...ResourceItemFragment
    }
    username
  }
`

export default function AccountTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay background={
      <ResourceItem query={null} />
    }
    >
      <Flex direction='column' align='center' justify='center'>
        <ResourceIcon mb={2} query={data.avatar} />
        <Text fontSize='md' color='gray.00'>
          {data.username}
        </Text>
      </Flex>
    </TileOverlay>
  )
}
