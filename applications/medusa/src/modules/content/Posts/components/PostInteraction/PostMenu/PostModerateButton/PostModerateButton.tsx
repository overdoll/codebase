import { Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { PostModerateButtonFragment$key } from '@//:artifacts/PostModerateButtonFragment.graphql'

import { useFragment } from 'react-relay/hooks'
import { MenuLinkItem } from '../../../../../ThemeComponents/Menu/Menu'
import { LoginKeys } from '@//:assets/icons'
import Can from '../../../../../../authorization/Can'

interface Props {
  query: PostModerateButtonFragment$key
}

const Fragment = graphql`
  fragment PostModerateButtonFragment on Post {
    reference
  }
`

export default function PostModerateButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Can I='staff' a='Post'>
      <MenuLinkItem
        href={`/moderation/post/${data.reference}`}
        text={(
          <Trans>
            Moderate
          </Trans>)}
        colorScheme='purple'
        icon={LoginKeys}
      />
    </Can>
  )
}
