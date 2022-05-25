import { useContext, useEffect } from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
import type { UploadArrangeStepFragment$key } from '@//:artifacts/UploadArrangeStepFragment.graphql'
import ProcessUploads from './ProcessUploads/ProcessUploads'
import ArrangeUploads from './ArrangeUploads/ArrangeUploads'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { UppyContext } from '../../../../../../context'
import { Stack } from '@chakra-ui/react'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props {
  query: UploadArrangeStepFragment$key
}

const Fragment = graphql`
  fragment UploadArrangeStepFragment on Post {
    content {
      id
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
  const { state } = useSequenceContext()
  const contentData = state.content ?? data?.content

  // We clear all uploads and re-add them when post content changes
  // so that we can keep the uppy file state and restrict uploads

  useEffect(() => {
    if (state.files.length < 1 && Object.keys(state.urls).length < 1) {
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
            Add, arrange, or remove the files you're uploading. You can encourage your fans to become paid supporters by
            marking
            some content as supporter-only.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <ArrangeUploads query={data} />
      <ProcessUploads query={data} />
    </Stack>
  )
}
