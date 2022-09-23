import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { TagsPublicPostFragment$key } from '@//:artifacts/TagsPublicPostFragment.graphql'
import PostPreviewCharacters from './PostPreviewCharacters/PostPreviewCharacters'
import { Box, Heading, Stack } from '@chakra-ui/react'
import PostPreviewCategories from './PostPreviewCategories/PostPreviewCategories'
import { useState } from 'react'
import { Plural, Trans } from '@lingui/macro'
import PostPreviewSeries from './PostPreviewSeries/PostPreviewSeries'

interface Props {
  postQuery: TagsPublicPostFragment$key
}

const PostFragment = graphql`
  fragment TagsPublicPostFragment on Post {
    ...PostPreviewCharactersFragment
    ...PostPreviewCategoriesFragment
    ...PostPreviewSeriesFragment
    characters {
      __typename
    }
    categories {
      __typename
    }
  }
`

export const CHARACTER_LIMIT = 4
export const CATEGORY_LIMIT = 9

export default function TagsPublicPost (props: Props): JSX.Element {
  const {
    postQuery
  } = props

  const postData = useFragment(PostFragment, postQuery)

  const [isExpanded, onExpand] = useState(false)

  const hasExpansion = postData.characters.length > CHARACTER_LIMIT || postData.categories.length > CATEGORY_LIMIT

  return (
    <Stack spacing={1}>
      <PostPreviewSeries postQuery={postData} />
      <PostPreviewCharacters isExpanded={isExpanded} postQuery={postData} />
      <PostPreviewCategories isExpanded={isExpanded} postQuery={postData} />
      {((hasExpansion && !isExpanded) && (
        <Box p={3} bg='dimmers.100' borderRadius='md' cursor='pointer' onClick={() => onExpand(true)}>
          <Heading
            fontSize={{
              base: '2xs',
              md: 'xs'
            }}
            color='whiteAlpha.800'
          >
            <Trans>
              Reveal
            </Trans>
            {postData.characters.length > CHARACTER_LIMIT && (
              <>
                {' '}
                <Plural
                  value={postData.characters.length - CHARACTER_LIMIT}
                  one='# character'
                  other='# characters'
                />
              </>
            )}
            {postData.categories.length > CATEGORY_LIMIT && (
              <>
                {' '}
                <Plural
                  value={postData.categories.length - CATEGORY_LIMIT}
                  one=' # category'
                  other=' # categories'
                />
              </>
            )}
          </Heading>
        </Box>
      ))}
    </Stack>
  )
}
