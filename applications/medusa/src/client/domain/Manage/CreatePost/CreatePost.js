/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import FileUploader from './FileUploader/FileUploader'
import { useTranslation } from 'react-i18next'

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
