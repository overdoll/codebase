import { Flex, Heading, Stack } from '@chakra-ui/react'
import PostStaticAudience from '../../../../../../modules/content/Posts/components/Content/PostStaticAudience/PostStaticAudience'
import PostStaticCharacters from '../../../../../../modules/content/Posts/components/Content/PostStaticCharacters/PostStaticCharacters'
import PostStaticCategories from '../../../../../../modules/content/Posts/components/Content/PostStaticCategories/PostStaticCategories'
import { graphql, useFragment } from 'react-relay'
import type { PostPreviewFragment$key } from '@//:artifacts/PostPreviewFragment.graphql'
import PostGalleryContent from '../../../../../../modules/content/Posts/components/PostGalleryContent/PostGalleryContent'
import PostIndexer from '../../../../../../modules/content/Posts/components/Interaction/PostIndexer/PostIndexer'
import { Trans } from '@lingui/macro'

interface Props {
  query: PostPreviewFragment$key
}

const PostPreviewGQL = graphql`
  fragment PostPreviewFragment on Post {
    ...PostStaticAudienceFragment
    ...PostStaticCharactersFragment
    ...PostStaticCategoriesFragment
    ...PostGalleryContentFragment
  }
`

export default function PostPreview ({ query }: Props): JSX.Element {
  const data = useFragment(PostPreviewGQL, query)

  return (
    <>
      <Stack spacing={2} direction='column'>
        <PostGalleryContent query={data}>
          {({
            slidesCount,
            currentSlide
          }) =>
            <PostIndexer length={slidesCount} currentIndex={currentSlide} />}
        </PostGalleryContent>
        <Stack spacing={2}>
          <Flex direction='column'>
            <Heading mb={1} fontSize='md' color='gray.300'>
              <Trans>
                Audience
              </Trans>
            </Heading>
            <PostStaticAudience query={data} />
          </Flex>
          <Flex direction='column'>
            <Heading mb={1} fontSize='md' color='gray.300'>
              <Trans>
                Characters
              </Trans>
            </Heading>
            <PostStaticCharacters query={data} />
          </Flex>
          <Flex direction='column'>
            <Heading mb={1} fontSize='md' color='gray.300'>
              <Trans>
                Categories
              </Trans>
            </Heading>
            <PostStaticCategories query={data} />
          </Flex>
        </Stack>
      </Stack>
    </>
  )
}
