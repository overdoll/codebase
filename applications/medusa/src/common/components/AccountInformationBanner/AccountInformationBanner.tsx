import { graphql, useFragment } from 'react-relay/hooks'
import { AccountInformationBannerFragment$key } from '@//:artifacts/AccountInformationBannerFragment.graphql'
import LockedAccountBanner from './LockedAccount/LockedAccountBanner/LockedAccountBanner'
import DeletingAccountBanner from './DeletingAccountBanner/DeletingAccountBanner'

interface Props {
  query: AccountInformationBannerFragment$key | null
}

const Fragment = graphql`
  fragment AccountInformationBannerFragment on Account {
    lock {
      __typename
    }
    deleting {
      __typename
    }
    ...LockedAccountBannerFragment
    ...DeletingAccountBannerFragment
  }
`

export default function AccountInformationBanner ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data == null) {
    return <></>
  }

  if (data.deleting != null) {
    return <DeletingAccountBanner query={data} />
  }

  if (data.lock != null) {
    return <LockedAccountBanner query={data} />
  }

  return (
    <></>
  )
}
