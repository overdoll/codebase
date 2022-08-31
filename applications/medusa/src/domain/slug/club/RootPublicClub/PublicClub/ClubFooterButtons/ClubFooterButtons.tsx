import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubFooterButtonsFragment$key } from '@//:artifacts/ClubFooterButtonsFragment.graphql'
import Can from '@//:modules/authorization/Can'
import { HStack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { LoginKeys, SettingCog } from '@//:assets/icons'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import ClubFooterCopyLinkButton from './ClubFooterCopyLinkButton/ClubFooterCopyLinkButton'
import ClubFooterLeaveButton from './ClubFooterLeaveButton/ClubFooterLeaveButton'
import ClubFooterManageSubscriptionButton from './ClubFooterManageSubscriptionButton/ClubFooterManageSubscriptionButton'
import { useLingui } from '@lingui/react'
import ClubFooterShareTwitterButton from './ClubFooterShareTwitterButton/ClubFooterShareTwitterButton'
import ClubFooterShareRedditButton from './ClubFooterShareRedditButton/ClubFooterShareRedditButton'
import ClubFooterShareDiscordButton from './ClubFooterShareDiscordButton/ClubFooterShareDiscordButton'

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
    ...ClubFooterShareTwitterButtonFragment
    ...ClubFooterShareRedditButtonFragment
    ...ClubFooterShareDiscordButtonFragment
  }
`

export default function ClubFooterButtons ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  return (
    <HStack w='100%' justify='flex-end' spacing={1}>
      <Can I='staff' a='Club'>
        <SmallGenericButton
          href={{
            pathname: '/staff/club/[slug]',
            query: { slug: data.slug }
          }}
          isIcon
          icon={LoginKeys}
        >
          {i18n._(t`Staff`)}
        </SmallGenericButton>
      </Can>
      {data.viewerIsOwner && (
        <SmallGenericButton
          href={{
            pathname: '/club/[slug]/home',
            query: { slug: data.slug }
          }}
          icon={SettingCog}
        >
          {i18n._(t`Manage Club`)}
        </SmallGenericButton>
      )}
      <ClubFooterLeaveButton query={data} />
      <ClubFooterCopyLinkButton query={data} />
      <ClubFooterShareDiscordButton query={data} />
      <ClubFooterShareRedditButton query={data} />
      <ClubFooterShareTwitterButton query={data} />
      <ClubFooterManageSubscriptionButton query={data} />
    </HStack>
  )
}
