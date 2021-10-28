/**
 * @flow
 */
import type { Node } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { AudienceFragment$key } from '@//:artifacts/AudienceFragment.graphql'
import type { AudienceTagFragment$key } from '@//:artifacts/AudienceTagFragment.graphql'

import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { Stack, Box, Heading, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import TagPreview from '../../../TagPreview/TagPreview'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: {
    post: AudienceFragment$key,
    tag: AudienceTagFragment$key
  }
}

const AudienceFragmentGQL = graphql`
  fragment AudienceFragment on Post {
    audience {
      id
      title
    }
  }
`

const AudienceTagFragmentGQL = graphql`
  fragment AudienceTagFragment on Query {
    audiences {
      edges {
        node {
          id
        }
      }
    }
  }
`

export default function Audience ({ uppy, state, dispatch, query }: Props): Node {
  const data = useFragment(AudienceFragmentGQL, query.post)
  const tagData = useFragment(AudienceTagFragmentGQL, query.tag)

  console.log(tagData)

  const [t] = useTranslation('manage')

  return (
    <Stack spacing={2}>
      <Box>
        <Heading fontSize='2xl' color='gray.00'>
          {t('posts.flow.steps.audience.selector.prompt')}
        </Heading>
        <Text fontSize='md'>
          {t('posts.flow.steps.audience.selector.description')}
        </Text>
      </Box>
      <Wrap>
        <WrapItem>
          <TagPreview />
        </WrapItem>
      </Wrap>
    </Stack>
  )
}
