import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubFooterButtonsFragment$key } from '@//:artifacts/ClubFooterButtonsFragment.graphql'
import Can from '@//:modules/authorization/Can'
import { HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { LoginKeys, SettingCog } from '@//:assets/icons'
import ClubFooterButton from './ClubFooterButton/ClubFooterButton'
import ClubFooterCopyLinkButton from './ClubFooterCopyLinkButton/ClubFooterCopyLinkButton'
import ClubFooterLeaveButton from './ClubFooterLeaveButton/ClubFooterLeaveButton'
import ClubFooterManageSubscriptionButton from './ClubFooterManageSubscriptionButton/ClubFooterManageSubscriptionButton'

interface Props {
  query: ClubFooterButtonsFragment$key
}

const Fragment = graphql`
  fragment ClubFooterButtonsFragment on Club {
    slug
    viewerIsOwner
    ...ClubFooterCopyLinkButtonFragment
    ...ClubFooterLeaveButtonFragment
    ...ClubFooterManageSubscriptionButtonFragment
  }
`

export default function ClubFooterButtons ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <HStack w='100%' justify='flex-end' spacing={1}>
      <Can I='staff' a='Club'>
        <ClubFooterButton
          href={{
            pathname: '/staff/club/[slug]',
            query: { slug: data.slug }
          }}
          isIcon
          icon={LoginKeys}
        >
          <Trans>
            Staff
          </Trans>
        </ClubFooterButton>
      </Can>
      {data.viewerIsOwner && (
        <ClubFooterButton
          href={{
            pathname: '/club/[slug]/home',
            query: { slug: data.slug }
          }}
          icon={SettingCog}
        >
          <Trans>
            Manage Club
          </Trans>
        </ClubFooterButton>
      )}
      <ClubFooterLeaveButton query={data} />
      <ClubFooterCopyLinkButton query={data} />
      <ClubFooterManageSubscriptionButton query={data} />
    </HStack>
  )
}
