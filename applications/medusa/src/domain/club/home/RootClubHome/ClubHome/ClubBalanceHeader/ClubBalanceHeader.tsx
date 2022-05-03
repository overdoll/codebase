import { graphql, useFragment } from 'react-relay/hooks'
import { ClubBalanceHeaderFragment$key } from '@//:artifacts/ClubBalanceHeaderFragment.graphql'
import ClubBalance from '../../../../revenue/root/RootClubRevenue/ClubRevenue/ClubFullBalance/ClubBalance/ClubBalance'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { useRouter } from 'next/router'
import { Trans } from '@lingui/macro'
import TextHeader from '../../../../../../common/components/TextHeader/TextHeader'
import { WarningTriangle } from '@//:assets/icons'

interface Props {
  query: ClubBalanceHeaderFragment$key
}

const Fragment = graphql`
  fragment ClubBalanceHeaderFragment on Club {
    owner {
      payoutMethod {
        __typename
      }
    }
    ...ClubBalanceFragment
  }
`

export default function ClubBalanceHeader ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { query: { slug } } = useRouter()

  if (data.owner.payoutMethod == null) {
    return (
      <LinkTile href='/settings/payouts'>
        <TextHeader
          colorScheme='orange'
          icon={WarningTriangle}
          title={(
            <Trans>
              Payouts Not Setup
            </Trans>)}
        >
          <Trans>
            In order to receive payouts, you must have an active payout method set up.
          </Trans>
        </TextHeader>
      </LinkTile>
    )
  }

  return (
    <LinkTile href={{
      pathname: '/club/[slug]/revenue',
      query: { slug: slug as string }
    }}
    >
      <ClubBalance query={data} />
    </LinkTile>
  )
}
