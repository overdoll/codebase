import { Flex, Heading, Stack } from '@chakra-ui/react'
import PostStaticAudience
  from '../../../../../../modules/content/Posts/components/Content/PostStaticAudience/PostStaticAudience'
import PostStaticCharacters
  from '../../../../../../modules/content/Posts/components/Content/PostStaticCharacters/PostStaticCharacters'
import PostStaticCategories
  from '../../../../../../modules/content/Posts/components/Content/PostStaticCategories/PostStaticCategories'
import { graphql, useFragment } from 'react-relay'
import type { PostPreviewFragment$key } from '@//:artifacts/PostPreviewFragment.graphql'
import { Trans } from '@lingui/macro'
import PostGalleryPublicDetailed
  from '@//:modules/content/Posts/components/Content/PostGalleryPublicDetailed/PostGalleryPublicDetailed'
import { PostFooter, PostHeaderClub, PostIndexer, PostVideoManagerContext } from '@//:modules/content/Posts'
import { useContext } from 'react'

interface Props {
  query: PostPreviewFragment$key
}

const PostPreviewGQL = graphql`
  fragment PostPreviewFragment on Post {
    ...PostStaticAudienceFragment
    ...PostStaticCharactersFragment
    ...PostStaticCategoriesFragment
    ...PostGalleryPublicDetailedFragment
    ...PostHeaderClubFragment
  }
`

export default function PostPreview ({ query }: Props): JSX.Element {
  const data = useFragment(PostPreviewGQL, query)

  const {
    slidesCount,
    currentSlide
  } = useContext(PostVideoManagerContext)

  return (
    <>
      <Stack spacing={2} direction='column'>
        <PostHeaderClub query={data} />
        <PostGalleryPublicDetailed query={data} />
        <PostFooter
          centerItem={<PostIndexer
            length={slidesCount}
            currentIndex={currentSlide}
                      />}
        />
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
