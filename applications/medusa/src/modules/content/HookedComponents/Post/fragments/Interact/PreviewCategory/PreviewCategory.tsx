import { graphql, useFragment } from 'react-relay/hooks'
import { PreviewCategoryFragment$key } from '@//:artifacts/PreviewCategoryFragment.graphql'
import { Heading, Stack } from '@chakra-ui/react'
import { TileOverlay } from '../../../../../ContentSelection'
import CategoryThumbnail
  from '../../../../../PageLayout/Display/fragments/Thumbnail/CategoryThumbnail/CategoryThumbnail'

interface Props {
  categoryQuery: PreviewCategoryFragment$key
}

const Fragment = graphql`
  fragment PreviewCategoryFragment on Category {
    title
    ...CategoryThumbnailFragment
  }
`

export default function PreviewCategory (props: Props): JSX.Element {
  const { categoryQuery } = props

  const data = useFragment(Fragment, categoryQuery)

  return (
    <TileOverlay
      backdrop={<CategoryThumbnail categoryQuery={data} />}
    >
      <Stack px={2} align='center' justify='center' minH={50} h='100%'>
        <Heading
          fontSize={{
            base: '2xs',
            md: 'xs'
          }}
          wordBreak='break-all'
          color='whiteAlpha.800'
          textAlign='center'
        >
          {data.title}
        </Heading>
      </Stack>
    </TileOverlay>
  )
}
