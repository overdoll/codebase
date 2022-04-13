import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubInfractionsFragment$key } from '@//:artifacts/StaffClubInfractionsFragment.graphql'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ClubInfractionHistory from './ClubInfractionHistory/ClubInfractionHistory'
import { Stack } from '@chakra-ui/react'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import IssueClubInfractionForm from './IssueClubInfractionForm/IssueClubInfractionForm'

interface Props {
  query: StaffClubInfractionsFragment$key
}

const Fragment = graphql`
  fragment StaffClubInfractionsFragment on Club {
    ...ClubInfractionHistoryFragment
    ...IssueClubInfractionFormFragment
    suspension {
      __typename
    }
  }
`

export default function StaffClubInfractions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const isSuspended = data.suspension != null

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
          </>
        )}
      </Stack>
    </>
  )
}
