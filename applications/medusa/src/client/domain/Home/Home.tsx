import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'

export default function Home (): JSX.Element {
  return (
    <>
      <Helmet title='home' />
      <PageWrapper>
        home
      </PageWrapper>
    </>
  )
}
