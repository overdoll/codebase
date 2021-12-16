import { Flex, Heading, Stack } from '@chakra-ui/react'
import PostAudience from './PostAudience/PostAudience'
import PostCharacters from './PostCharacters/PostCharacters'
import PostCategories from './PostCategories/PostCategories'
import { useTranslation } from 'react-i18next'
import { graphql, useFragment } from 'react-relay'
import type { PostPreviewFragment$key } from '@//:artifacts/PostPreviewFragment.graphql'
import PostGalleryContent from '../../../../../components/Posts/PostGalleryContent/PostGalleryContent'
import PostIndexer from '../../../../../components/Posts/PostIndexer/PostIndexer'

interface Props {
  query: PostPreviewFragment$key
}

const PostPreviewGQL = graphql`
  fragment PostPreviewFragment on Post {
    ...PostAudienceFragment
    ...PostCharactersFragment
    ...PostCategoriesFragment
    ...PostGalleryContentFragment
  }
`

export default function PostPreview ({ query }: Props): JSX.Element {
  const [t] = useTranslation('moderation')

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
            <Heading mb={1} fontSize='md' color='gray.300'>{t('queue.post.tags.audience')}</Heading>
            <PostAudience query={data} />
          </Flex>
          <Flex direction='column'>
            <Heading mb={1} fontSize='md' color='gray.300'>{t('queue.post.tags.characters')}</Heading>
            <PostCharacters query={data} />
          </Flex>
          <Flex direction='column'>
            <Heading mb={1} fontSize='md' color='gray.300'>{t('queue.post.tags.categories')}</Heading>
            <PostCategories query={data} />
          </Flex>
        </Stack>
      </Stack>
    </>
  )
}
