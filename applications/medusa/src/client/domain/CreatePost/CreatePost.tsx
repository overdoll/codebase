import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import FileUploader from './FileUploader/FileUploader'

export default function CreatePost (): JSX.Element {
  return (
    <>
      <Helmet title='create post' />
      <PageWrapper>
        <FileUploader />
      </PageWrapper>
    </>
  )
}
