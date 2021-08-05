/**
 * @flow
 */
import type { Node } from 'react'
import { Flex, Heading, Stack } from '@chakra-ui/react'
import PostContent from './PostContent/PostContent'
import PostArtist from './PostArtist/PostArtist'
import PostCharacters from './PostCharacters/PostCharacters'
import PostCategories from './PostCategories/PostCategories'
import { useTranslation } from 'react-i18next'
import { useFragment, graphql } from 'react-relay'
import type { PostPreviewFragment$key } from '@//:artifacts/PostPreviewFragment.graphql'

type Props = {
  post: PostPreviewFragment$key,
}

const PostPreviewGQL = graphql`
  fragment PostPreviewFragment on Post {
    ...PostContentFragment
    ...PostArtistFragment
    ...PostCharactersFragment
    ...PostCategoriesFragment
  }
`

export default function PostPreview ({ post }: Props): Node {
  const [t] = useTranslation('moderation')

  const data = useFragment(PostPreviewGQL, post)

  return (
    <Stack spacing={2} direction='column' mt={4}>
      <Flex mb={1} direction='column'>
        <Heading mb={2} color='gray.00' size='md'>{t('queue.post.content')}</Heading>
        <PostContent content={data} />
      </Flex>
      <Flex direction='column'>
        <Heading mb={2} color='gray.00' size='md'>{t('queue.post.tags.title')}</Heading>
        <Stack spacing={2}>
          <Flex direction='column'>
            <Heading mb={1} fontSize='md' color='teal.50'>{t('queue.post.tags.artist')}</Heading>
            <PostArtist artist={data} />
          </Flex>
          <Flex direction='column'>
            <Heading mb={1} fontSize='md' color='purple.50'>{t('queue.post.tags.characters')}</Heading>
            <PostCharacters characters={data} />
          </Flex>
          <Flex direction='column'>
            <Heading mb={1} fontSize='md' color='orange.50'>{t('queue.post.tags.categories')}</Heading>
            <PostCategories categories={data} />
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  )
}
