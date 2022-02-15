import { Stack, Text } from '@chakra-ui/react'
import ResourceItem from '../../../../DataDisplay/ResourceItem/ResourceItem'
import { CategoryIdentifier } from '@//:assets/icons/interface'
import { graphql, useFragment } from 'react-relay/hooks'
import { CategoryTileOverlayFragment$key } from '@//:artifacts/CategoryTileOverlayFragment.graphql'
import { TileOverlay } from '../../../index'
import { Icon } from '../../../../PageLayout'

interface Props {
  query: CategoryTileOverlayFragment$key
}

const Fragment = graphql`
  fragment CategoryTileOverlayFragment on Category {
    title
    thumbnail {
      ...ResourceItemFragment
    }

  }
`

export default function CategoryTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay background={
      <ResourceItem
        h='100%'
        query={data.thumbnail}
      />
    }
    >
      <Stack spacing={1}>
        <Icon w={4} h={4} icon={CategoryIdentifier} fill='gray.00' />
        <Text
          fontSize='lg'
          color='gray.00'
          textAlign='center'
        >
          {data.title}
        </Text>
      </Stack>
    </TileOverlay>
  )
}
