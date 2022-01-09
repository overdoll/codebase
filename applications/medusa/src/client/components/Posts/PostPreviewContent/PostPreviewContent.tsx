import { graphql, useFragment } from 'react-relay'
import type { PostPreviewContentFragment$key } from '@//:artifacts/PostPreviewContentFragment.graphql'
import { Flex } from '@chakra-ui/react'
import ImageSnippet from '@//:modules/content/DataDisplay/Snippets/ImageSnippet/ImageSnippet'
import VideoSnippet from '@//:modules/content/DataDisplay/Snippets/VideoSnippet/VideoSnippet'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import { ClickableBox } from '@//:modules/content/PageLayout'

interface Props {
  query: PostPreviewContentFragment$key
}

const Fragment = graphql`
  fragment PostPreviewContentFragment on Post {
    content {
      type
      ...ImageSnippetFragment
      ...VideoSnippetFragment
    }
  }
`

export default function PostPreviewContent ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const hasFirstContent = data.content.length > 0

  const firstContent = data.content[0]

  return (
    <ClickableBox borderRadius='md' overflow='hidden' h='100%' p={0}>
      <Flex w='100%' h='100%' justify='center' align='center'>
        {hasFirstContent &&
          <Flex h='100%'>
            {firstContent.type === 'IMAGE' &&
              <ImageSnippet h='100%' query={firstContent} />}
            {firstContent.type === 'VIDEO' &&
              <VideoSnippet
                h='100%'
                query={firstContent}
              />}
          </Flex>}
      </Flex>
    </ClickableBox>

  )
}
