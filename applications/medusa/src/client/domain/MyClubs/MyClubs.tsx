import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'

export default function MyClubs (): JSX.Element {
  return (
    <>
      <Helmet title='my clubs' />
      <PageWrapper>
        my clubs
      </PageWrapper>
    </>
  )
}
