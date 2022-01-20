import { useContext, useEffect } from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ArrangeFragment$key } from '@//:artifacts/ArrangeFragment.graphql'
import ProcessUploads from './ProcessUploads/ProcessUploads'
import ArrangeUploads from './ArrangeUploads/ArrangeUploads'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { StateContext, UppyContext } from '../../../../../context'

interface Props {
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
  query
}: Props): JSX.Element {
  const data = useFragment(ArrangeFragmentGQL, query)

  const uppy = useContext(UppyContext)
  const state = useContext(StateContext)
  const contentData = state.content ?? data?.content

  // We clear all uploads and re-add them when post content changes
  // so that we can keep the uppy file state and restrict uploads

  useEffect(() => {
    if (state.files.length < 1 && Object.keys(state.urls).length < 1) {
      uppy.cancelAll()
      data.content.forEach(file => {
        const resource = file.urls[0]

        const uppyFileId = uppy.addFile({
          id: file.id,
          name: file.id,
          type: resource.mimeType,
          data: new Blob(),
          source: 'already-uploaded'
        })

        const fileFromUppy = uppy.getFile(uppyFileId)
        uppy.emit('upload-started', fileFromUppy)
        uppy.emit('upload-progress', fileFromUppy, {
          bytesUploaded: 1,
          bytesTotal: 1
        })
        uppy.emit('upload-success', fileFromUppy, 'success')
      })
    }
  }, [data.content])

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Posting {contentData.length} Media
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            Add, arrange, or remove the files you're uploading.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <ProcessUploads query={data} />
      <ArrangeUploads query={data} />
    </>
  )
}
