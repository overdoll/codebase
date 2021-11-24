/**
 * @flow
 */
import type { Node } from 'react'
import { Flex, Heading, Stack } from '@chakra-ui/react'
import PostContent from './PostContent/PostContent'
import PostAudience from './PostAudience/PostAudience'
import PostCharacters from './PostCharacters/PostCharacters'
import PostCategories from './PostCategories/PostCategories'
import { useTranslation } from 'react-i18next'
import { useFragment, graphql } from 'react-relay'
import type { PostPreviewFragment$key } from '@//:artifacts/PostPreviewFragment.graphql'

type Props = {
  query: PostPreviewFragment$key,
}

const PostPreviewGQL = graphql`
  fragment PostPreviewFragment on Post {
    ...PostContentFragment
    ...PostAudienceFragment
    ...PostCharactersFragment
    ...PostCategoriesFragment
  }
`

export default function PostPreview ({ query }: Props): Node {
  const [t] = useTranslation('moderation')

  const data = useFragment(PostPreviewGQL, query)

  return (
    <Stack spacing={2} direction='column'>
      <PostContent query={data} />
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
  )
}
