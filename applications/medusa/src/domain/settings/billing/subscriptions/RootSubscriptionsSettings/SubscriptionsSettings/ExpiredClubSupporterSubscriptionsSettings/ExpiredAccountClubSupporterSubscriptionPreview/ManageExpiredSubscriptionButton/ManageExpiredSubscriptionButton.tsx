import { graphql, useFragment } from 'react-relay/hooks'
import type {
  ManageExpiredSubscriptionButtonFragment$key
} from '@//:artifacts/ManageExpiredSubscriptionButtonFragment.graphql'
import { Trans } from '@lingui/macro'
import { PremiumStar } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  query: ManageExpiredSubscriptionButtonFragment$key
}

const Fragment = graphql`
  fragment ManageExpiredSubscriptionButtonFragment on ExpiredAccountClubSupporterSubscription {
    club {
      slug
    }
  }
`

export default function ManageExpiredSubscriptionButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <LinkButton
      w='100%'
      href={`/${data.club.slug}?support=true`}
      leftIcon={(
        <Icon
          icon={PremiumStar}
          fill='orange.900'
          h={4}
          w={4}
        />)}
      size='md'
      colorScheme='orange'
    >
      <Trans>
        Continue Support
      </Trans>
    </LinkButton>
  )
}
