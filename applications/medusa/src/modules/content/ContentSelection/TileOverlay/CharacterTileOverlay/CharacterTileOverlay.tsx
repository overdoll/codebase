import { Stack, Text } from '@chakra-ui/react'
import ResourceItem from '../../../DataDisplay/ResourceItem/ResourceItem'
import { CharacterIdentifier } from '@//:assets/icons/interface'
import { graphql, useFragment } from 'react-relay/hooks'
import { CharacterTileOverlayFragment$key } from '@//:artifacts/CharacterTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'
import { Icon } from '../../../PageLayout'

interface Props {
  query: CharacterTileOverlayFragment$key
}

const Fragment = graphql`
  fragment CharacterTileOverlayFragment on Character {
    id
    name
    series {
      title
    }
    thumbnail {
      ...ResourceItemFragment
    }

  }
`

export default function CharacterTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay backdrop={
      <ResourceItem
        seed={data.id}
        query={data.thumbnail}
      />
    }
    >
      <Stack spacing={1}>
        <Icon w={4} h={4} icon={CharacterIdentifier} fill='gray.00' />
        <Text
          fontSize='lg'
          color='gray.00'
          textAlign='center'
        >
          {data.name}
        </Text>
        <Text
          textAlign='center'
          fontSize='sm'
          color='gray.100'
        >
          {data.series.title}
        </Text>
      </Stack>
    </TileOverlay>
  )
}
