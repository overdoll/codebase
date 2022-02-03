import { useContext, useEffect } from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
import type { UploadArrangeStepFragment$key } from '@//:artifacts/UploadArrangeStepFragment.graphql'
import ProcessUploads from './ProcessUploads/ProcessUploads'
import ArrangeUploads from './ArrangeUploads/ArrangeUploads'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { UppyContext } from '../../../../../context'
import { Stack } from '@chakra-ui/react'
import { StateContext } from '@//:modules/hooks/useReducerBuilder/context'

interface Props {
  query: UploadArrangeStepFragment$key
}

const Fragment = graphql`
  fragment UploadArrangeStepFragment on Post {
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

export default function UploadArrangeStep ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const uppy = useContext(UppyContext)
  const state = useContext(StateContext)
  const contentData = state.content ?? data?.content

  // We clear all uploads and re-add them when post content changes
  // so that we can keep the uppy file state and restrict uploads

  useEffect(() => {
    if (state.uploads.files.length < 1 && Object.keys(state.uploads.urls).length < 1) {
      uppy.cancelAll()
      data.content.forEach(file => {
        const uppyFileId = uppy.addFile({
          id: file.id,
          name: file.id,
          type: 'image/png',
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
    <Stack spacing={2}>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>Posting {contentData.length} media</Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            Add, arrange, or remove the files you're uploading.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <ProcessUploads query={data} />
      <ArrangeUploads query={data} />
    </Stack>
  )
}
