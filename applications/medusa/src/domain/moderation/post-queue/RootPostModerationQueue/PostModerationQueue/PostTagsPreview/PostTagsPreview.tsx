import { Flex, Heading, Stack } from '@chakra-ui/react'
import PostStaticAudience from '@//:modules/content/Posts/components/PostData/PostStaticAudience/PostStaticAudience'
import PostStaticCharacters
  from '@//:modules/content/Posts/components/PostData/PostStaticCharacters/PostStaticCharacters'
import PostStaticCategories
  from '@//:modules/content/Posts/components/PostData/PostStaticCategories/PostStaticCategories'
import { graphql, useFragment } from 'react-relay'
import type { PostTagsPreviewFragment$key } from '@//:artifacts/PostTagsPreviewFragment.graphql'
import { Trans } from '@lingui/macro'

interface Props {
  query: PostTagsPreviewFragment$key
}

const Fragment = graphql`
  fragment PostTagsPreviewFragment on Post {
    ...PostStaticAudienceFragment
    ...PostStaticCharactersFragment
    ...PostStaticCategoriesFragment
  }
`

export default function PostTagsPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack mt={2} spacing={2}>
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
  )
}
