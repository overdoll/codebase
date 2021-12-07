/**
 * @flow
 */
import type { Node } from 'react'
import {
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import { Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { ReviewFragment$key } from '@//:artifacts/ReviewFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import PostGalleryContent
  from '../../../../../../../../../components/Posts/PostGalleryContent/PostGalleryContent'
import PostBrand from '../../../../../../../../../components/Posts/PostBrand/PostBrand'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: ReviewFragment$key,
}

const ReviewFragmentGQL = graphql`
  fragment ReviewFragment on Query {
    post (reference: $reference) {
      id
      content {
        urls {
          url
          mimeType
        }
      }
      ...PostGalleryContentFragment
      ...PostBrandFragment
    }
  }
`

export default function Review ({ uppy, state, dispatch, query }: Props): Node {
  const data = useFragment(ReviewFragmentGQL, query)

  const [t] = useTranslation('manage')

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          {t('create_post.flow.steps.review.body.title')}
        </PageSectionTitle>
        <PageSectionDescription>
          {t('create_post.flow.steps.review.body.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <Stack spacing={2}>
        <PostBrand query={data.post} />
        <PostGalleryContent query={data.post} />
      </Stack>
    </>
  )
}
