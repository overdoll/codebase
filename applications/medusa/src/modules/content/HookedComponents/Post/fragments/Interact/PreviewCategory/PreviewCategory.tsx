import { graphql, useFragment } from 'react-relay/hooks'
import { PreviewCategoryFragment$key } from '@//:artifacts/PreviewCategoryFragment.graphql'
import { Heading, Stack } from '@chakra-ui/react'
import { TileOverlay } from '../../../../../ContentSelection'
import CategorySmallBanner
  from '../../../../../PageLayout/Display/fragments/SmallBanner/CategorySmallBanner/CategorySmallBanner'

interface Props {
  categoryQuery: PreviewCategoryFragment$key
}

const Fragment = graphql`
  fragment PreviewCategoryFragment on Category {
    title
    ...CategorySmallBannerFragment
  }
`

export default function PreviewCategory (props: Props): JSX.Element {
  const { categoryQuery } = props

  const data = useFragment(Fragment, categoryQuery)

  return (
    <TileOverlay
      backdrop={<CategorySmallBanner categoryQuery={data} />}
    >
      <Stack px={2} align='center' justify='center' minH={50} h='100%'>
        <Heading
          fontSize={{
            base: 'sm',
            md: 'md'
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
