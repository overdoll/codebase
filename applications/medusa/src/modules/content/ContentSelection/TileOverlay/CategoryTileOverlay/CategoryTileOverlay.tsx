import { Center, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { CategoryTileOverlayFragment$key } from '@//:artifacts/CategoryTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'
import CategoryBanner from '../../../PageLayout/Display/fragments/Banner/CategoryBanner/CategoryBanner'

interface Props {
  query: CategoryTileOverlayFragment$key
}

const Fragment = graphql`
  fragment CategoryTileOverlayFragment on Category {
    title
    ...CategoryBannerFragment
  }
`

export default function CategoryTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay backdrop={<CategoryBanner categoryQuery={data} />}>
      <Center bg='dimmers.200' overflow='visible' whiteSpace='pre' p={2} w='100%' h='100%'>
        <Text
          fontSize={{
            base: 'sm',
            md: 'lg'
          }}
          overflow='visible'
          color='gray.00'
          textAlign='center'
          whiteSpace='normal'
          wordBreak='break-word'
          noOfLines={4}
        >
          {data.title}
        </Text>
      </Center>
    </TileOverlay>
  )
}
