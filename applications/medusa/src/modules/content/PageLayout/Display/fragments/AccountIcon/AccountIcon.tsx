import { graphql } from 'react-relay'
import type { AccountIconFragment$key } from '@//:artifacts/AccountIconFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { IconSizes } from '../../../../HookedComponents/Media/fragments/Media/IconImageMedia/IconImageMedia'
import IconSizer from '../../../../HookedComponents/Media/fragments/IconMedia/IconSizer/IconSizer'
import RandomIcon from '../../components/RandomIcon/RandomIcon'

const Fragment = graphql`
  fragment AccountIconFragment on Account {
    id
    avatar {
      __typename
    }
  }
`

interface Props {
  accountQuery: AccountIconFragment$key | null
  size?: IconSizes
}

export default function AccountIcon (props: Props): JSX.Element {
  const {
    accountQuery,
    size = 'sm'
  } = props

  const data = useFragment(Fragment, accountQuery)

  if (data?.avatar == null) {
    return (
      <IconSizer size={size}>
        <RandomIcon seed={data?.id} />
      </IconSizer>
    )
  }

  return <></>
}
