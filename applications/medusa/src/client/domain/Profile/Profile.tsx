import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import FloatingGeneralSearchButton from '../../components/FloatingGeneralSearchButton/FloatingGeneralSearchButton'

export default function Profile (): JSX.Element {
  return (
    <>
      <Helmet title='profile' />
      <PageWrapper>
        profile
        <FloatingGeneralSearchButton />
      </PageWrapper>
    </>
  )
}
