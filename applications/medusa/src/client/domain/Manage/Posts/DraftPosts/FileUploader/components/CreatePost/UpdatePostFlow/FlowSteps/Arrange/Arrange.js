/**
 * @flow
 */
import type { Node } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { graphql, useFragment } from 'react-relay/hooks'
import { useEffect } from 'react'
import {
  Flex,
  Stack,
  Text,
  Heading
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { ArrangeFragment$key } from '@//:artifacts/ArrangeFragment.graphql'
import ProcessUploads from './ProcessUploads/ProcessUploads'
import ArrangeUploads from './ArrangeUploads/ArrangeUploads'
import Button from '@//:modules/form/Button'
import Icon from '@//:modules/content/Icon/Icon'
import FilePicker from '../../../../FilePicker/FilePicker'
import InterfaceUploadBox2
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/upload-download/interface-upload-box-2.svg'
import { EVENTS } from '../../../../../constants/constants'
import {
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap,
  SmallBackgroundBox
} from '@//:modules/content/PageLayout'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: ArrangeFragment$key
};

const ArrangeFragmentGQL = graphql`
  fragment ArrangeFragment on Query {
    post (reference: $reference) {
      content {
        id
        urls {
          url
          mimeType
        }
      }
      ...ArrangeUploadsFragment
      ...ProcessUploadsFragment
    }
  }
`

export default function Arrange ({ uppy, dispatch, state, query }: Props): Node {
  const data = useFragment(ArrangeFragmentGQL, query)

  const [t] = useTranslation('manage')

  const disableUploads = (state.files.length !== (Object.keys(state.urls)).length) || (state.files.length > 0)

  const contentData = state.content || data.post.content

  // We clear all uploads and re-add them when post content changes
  // so that we can keep the uppy file state and restrict uploads
  useEffect(() => {
    if (state.files.length < 1 && state.urls.length < 1) {
      uppy.cancelAll()
      data.post.content.forEach(file => {
        const resource = file.urls[0]
        const tempUrl = 'https://overdoll.test/api/upload/' + resource.url
        fetch(tempUrl)
          .then((response) => response.blob()) // returns a Blob
          .then((blob) => {
            const uppyFileId = uppy.addFile({
              id: file.id,
              name: file.id,
              type: blob.type,
              data: blob,
              source: 'already-uploaded'
            })
            const fileFromUppy = uppy.getFile(uppyFileId)
            uppy.emit('upload-started', fileFromUppy)
            uppy.emit('upload-progress', fileFromUppy, {
              bytesUploaded: blob.size,
              bytesTotal: blob.size
            })
            uppy.emit('upload-success', fileFromUppy, 'success')
          })
      })
    }
  }, [data.content])

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          {t('posts.flow.steps.arrange.uploader.title', { count: contentData.length })}
        </PageSectionTitle>
        <PageSectionDescription>
          {t('posts.flow.steps.arrange.uploader.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <ProcessUploads uppy={uppy} state={state} dispatch={dispatch} query={data.post} />
      <ArrangeUploads uppy={uppy} state={state} dispatch={dispatch} query={data.post} />
    </>
  )
}
