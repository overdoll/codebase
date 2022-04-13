import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { NameClubSettingsQuery } from '@//:artifacts/NameClubSettingsQuery.graphql'
import { Stack, Text } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import ChangeClubNameForm from './ChangeClubNameForm/ChangeClubNameForm'
import { NotFoundClub } from '@//:modules/content/Placeholder'

interface Props {
  query: PreloadedQuery<NameClubSettingsQuery>
}

const Query = graphql`
  query NameClubSettingsQuery($slug: String!) {
    club(slug: $slug) {
      name
      ...ChangeClubNameFormFragment
    }
  }
`

export default function NameClubSettings ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<NameClubSettingsQuery>(
    Query,
    query
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  return (
    <Stack spacing={4}>
      <SmallBackgroundBox>
        <Text fontFamily='mono' fontSize='2xl' color='gray.00'>{queryData?.club.name}</Text>
      </SmallBackgroundBox>
      <Collapse>
        <CollapseButton size='md'>
          <Trans>
            Change Club Name
          </Trans>
        </CollapseButton>
        <CollapseBody>
          <ChangeClubNameForm query={queryData.club} />
        </CollapseBody>
      </Collapse>
    </Stack>
  )
}
