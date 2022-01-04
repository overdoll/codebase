import { Helmet } from 'react-helmet-async'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import CreateClub from './CreateClub/CreateClub'
import { Trans } from '@lingui/macro'
import Link from '../../../modules/routing/Link'
import Button from '@//:modules/form/Button/Button'
import { Flex } from '@chakra-ui/react'

export default function RootCreateClub (): JSX.Element {
  return (
    <>
      <Helmet title='create club' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Create a Club
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            Creating a club allows you to create posts and display them, as well as your community, in one place.
          </PageSectionDescription>
        </PageSectionWrap>
        <CreateClub />
        <Flex mt={8} justify='center'>
          <Link to='/manage/clubs'>
            <Button size='sm' variant='link'>
              <Trans>
                Go back to Manage Clubs
              </Trans>
            </Button>
          </Link>
        </Flex>
      </PageWrapper>
    </>
  )
}
