import { Helmet } from 'react-helmet-async'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import CreateClub from './CreateClub/CreateClub'
import { Trans } from '@lingui/macro'

export default function RootCreateClub (): JSX.Element {
  return (
    <>
      <Helmet title='create club' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              Create a Club
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            Creating a club allows you to create posts and display them, as well as your community, in one place.
          </PageSectionDescription>
        </PageSectionWrap>
        <CreateClub />
      </PageWrapper>
    </>
  )
}
