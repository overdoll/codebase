/**
 * @flow
 */
import type { Node } from 'react'
import {
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '../../../../../../../../../../components/PageLayout'
import { useTranslation } from 'react-i18next'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { ReviewFragment$key } from '@//:artifacts/ReviewFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import PostGalleryContent
  from '../../../../../../../../../../components/Posts/Post/PostGalleryContent/PostGalleryContent'

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
          {t('posts.flow.steps.review.body.title')}
        </PageSectionTitle>
        <PageSectionDescription>
          {t('posts.flow.steps.review.body.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <PostGalleryContent query={data.post} />
    </>
  )
}
