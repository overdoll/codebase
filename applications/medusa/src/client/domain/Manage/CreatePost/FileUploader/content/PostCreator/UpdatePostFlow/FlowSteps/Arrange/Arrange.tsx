import { useEffect } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { graphql, useFragment } from 'react-relay/hooks'
import { useTranslation } from 'react-i18next'
import type { ArrangeFragment$key } from '@//:artifacts/ArrangeFragment.graphql'
import ProcessUploads from './ProcessUploads/ProcessUploads'
import ArrangeUploads from './ArrangeUploads/ArrangeUploads'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: ArrangeFragment$key
}

const ArrangeFragmentGQL = graphql`
  fragment ArrangeFragment on Post {
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
`

export default function Arrange ({
  uppy,
  dispatch,
  state,
  query
}: Props): JSX.Element {
  const data = useFragment(ArrangeFragmentGQL, query)

  const [t] = useTranslation('manage')

  const contentData = state.content ?? data?.content

  // We clear all uploads and re-add them when post content changes
  // so that we can keep the uppy file state and restrict uploads

  useEffect(() => {
    if (state.files.length < 1 && Object.keys(state.urls).length < 1) {
      uppy.cancelAll()
      data.content.forEach(async file => {
        const resource = file.urls[0]
        const tempUrl = resource.url as string
        await fetch(tempUrl)
          .then(async (response) => await response.blob()) // returns a Blob
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
          {t('create_post.flow.steps.arrange.uploader.title', { count: contentData.length })}
        </PageSectionTitle>
        <PageSectionDescription>
          {t('create_post.flow.steps.arrange.uploader.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <ProcessUploads uppy={uppy} state={state} dispatch={dispatch} query={data} />
      <ArrangeUploads uppy={uppy} state={state} dispatch={dispatch} query={data} />
    </>
  )
}
