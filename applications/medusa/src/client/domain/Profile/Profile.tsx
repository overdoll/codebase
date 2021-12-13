import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'

export default function Profile (): JSX.Element {
  return (
    <>
      <Helmet title='profile' />
      <PageWrapper>
        profile
      </PageWrapper>
    </>
  )
}
