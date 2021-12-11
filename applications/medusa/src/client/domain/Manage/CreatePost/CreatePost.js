/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import FileUploader from './FileUploader/FileUploader'

type Props = {}

export default function CreatePost (props: Props): Node {
  return (
    <>
      <Helmet title='create post' />
      <PageWrapper>
        <FileUploader />
      </PageWrapper>
    </>
  )
}
