import { Trans } from '@lingui/macro'
import { graphql, useFragment } from 'react-relay/hooks'
import type {
  ClubExclusiveContentSuspensionNoticeFragment$key
} from '@//:artifacts/ClubExclusiveContentSuspensionNoticeFragment.graphql'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { HStack } from '@chakra-ui/react'
import ClubExclusivePosts from '../../../../../../_toMigrate/PublicClub/PublicClub/ClubExclusivePosts/ClubExclusivePosts'
import differenceInDays from 'date-fns/differenceInDays'

interface Props {
  query: ClubExclusiveContentSuspensionNoticeFragment$key
}

const Fragment = graphql`
  fragment ClubExclusiveContentSuspensionNoticeFragment on Club {
    suspension {
      expires
    }
    ...ClubExclusivePostsFragment
  }
`

export default function ClubExclusiveContentSuspensionNotice ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data.suspension == null) {
    return <ClubExclusivePosts query={data} />
  }

  const difference = differenceInDays(new Date(data.suspension?.expires), new Date())

  return (
    <Alert mb={2} status='warning'>
      <HStack>
        <AlertIcon />
        <AlertDescription>
          <Trans>
            This club is currently suspended. You cannot access its exclusive content.
          </Trans>
          {' '}
          {difference >= 29 && <Trans>The suspension is longer than 30 days.</Trans>}
        </AlertDescription>
      </HStack>
    </Alert>
  )
}
