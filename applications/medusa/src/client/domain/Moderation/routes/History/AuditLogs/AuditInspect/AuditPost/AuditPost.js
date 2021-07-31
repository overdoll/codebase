/**
 * @flow
 */

import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import type { Node } from 'react'
import type { AuditPostFragment$key } from '@//:artifacts/AuditPostFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import PostArtist from '../../../../Queue/PendingPosts/PostArtist/PostArtist'
import PostContent from '../../../../Queue/PendingPosts/PostContent/PostContent'
import PostCategories from '../../../../Queue/PendingPosts/PostCategories/PostCategories'
import PostCharacters from '../../../../Queue/PendingPosts/PostCharacters/PostCharacters'

type Props = {
  auditLog: AuditPostFragment$key,
}

const AuditPostFragmentGQL = graphql`
  fragment AuditPostFragment on PostAuditLog {
    post {
      ...PostArtistFragment
      ...PostContentFragment
      ...PostCharactersFragment
      ...PostCategoriesFragment
    }
  }
`

export default function AuditPost ({ auditLog }: Props): Node {
  const [t] = useTranslation('moderation')
  const queryData = useFragment(AuditPostFragmentGQL, auditLog)

  const data = queryData.post

  return (
    <>
      <Box>
        <Heading mb={2} color='gray.100' size='sm'>{t('history.inspect.content')}</Heading>
        <PostContent content={data} />
      </Box>
      <Stack spacing={2}>
        <Flex direction='column'>
          <Heading mb={1} fontSize='md' color='teal.50'>{t('history.inspect.artist')}</Heading>
          <PostArtist artist={data} />
        </Flex>
        <Flex direction='column'>
          <Heading mb={1} fontSize='md' color='teal.50'>{t('history.inspect.characters')}</Heading>
          <PostCharacters characters={data} />
        </Flex>
        <Flex direction='column'>
          <Heading mb={1} fontSize='md' color='teal.50'>{t('history.inspect.categories')}</Heading>
          <PostCategories categories={data} />
        </Flex>
      </Stack>
    </>
  )
}
