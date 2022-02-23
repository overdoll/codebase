import { graphql, useFragment } from 'react-relay/hooks'
import { AdminClubInfractionsFragment$key } from '@//:artifacts/AdminClubInfractionsFragment.graphql'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ClubInfractionHistory from './ClubInfractionHistory/ClubInfractionHistory'
import { Stack } from '@chakra-ui/react'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import IssueClubInfractionForm from './IssueClubInfractionForm/IssueClubInfractionForm'
import SuspendClubForm from './SuspendClubForm/SuspendClubForm'

interface Props {
  query: AdminClubInfractionsFragment$key
}

const Fragment = graphql`
  fragment AdminClubInfractionsFragment on Club {
    ...ClubInfractionHistoryFragment
    ...IssueClubInfractionFormFragment
    ...SuspendClubFormFragment
    suspension {
      __typename
    }
  }
`

export default function AdminClubInfractions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const isSuspended = data.suspension != null

  //

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Infractions
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <ClubInfractionHistory query={data} />
        {!isSuspended && (
          <>
            <Collapse>
              <CollapseButton>
                <Trans>
                  Issue Infraction
                </Trans>
              </CollapseButton>
              <CollapseBody>
                <IssueClubInfractionForm query={data} />
              </CollapseBody>
            </Collapse>
            <Collapse>
              <CollapseButton>
                <Trans>
                  Suspend Club
                </Trans>
              </CollapseButton>
              <CollapseBody>
                <SuspendClubForm query={data} />
              </CollapseBody>
            </Collapse>
          </>
        )}
      </Stack>
    </>
  )
}
