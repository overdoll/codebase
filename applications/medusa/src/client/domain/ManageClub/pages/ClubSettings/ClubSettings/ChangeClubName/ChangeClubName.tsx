import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeClubNameFragment$key } from '@//:artifacts/ChangeClubNameFragment.graphql'
import { Text } from '@chakra-ui/react'
import { ListSpacer, PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '../../../../../../../modules/content/ThemeComponents/Collapse/Collapse'
import ChangeClubNameForm from './ChangeClubNameForm/ChangeClubNameForm'

interface Props {
  query: ChangeClubNameFragment$key
}

const Fragment = graphql`
  fragment ChangeClubNameFragment on Club {
    name
    ...ChangeClubNameFormFragment
  }
`

export default function ChangeClubName ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Club Name
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <ListSpacer>
        <SmallBackgroundBox>
          <Text fontFamily='mono' fontSize='2xl' color='gray.00'>{data?.name}</Text>
        </SmallBackgroundBox>
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Club Name
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeClubNameForm query={data} />
          </CollapseBody>
        </Collapse>
      </ListSpacer>
    </>
  )
}
