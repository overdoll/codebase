import { Trans } from '@lingui/macro'
import { LoginKeys } from '@//:assets/icons/navigation'
import { graphql } from 'react-relay'
import { PostMenuFragment$key } from '@//:artifacts/PostMenuFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Menu, MenuLinkItem } from '../../../../ThemeComponents/Menu/Menu'
import Can from '../../../../../authorization/Can'
import PostReportButton from './PostReportButton/PostReportButton'
import PostCopyLinkButton from './PostCopyLinkButton/PostCopyLinkButton'

interface Props {
  query: PostMenuFragment$key
  size?: string
}

const Fragment = graphql`
  fragment PostMenuFragment on Post {
    reference @required(action: THROW)
    ...PostReportButtonFragment
    ...PostCopyLinkButtonFragment
  }
`

export default function PostMenu ({
  query,
  size = 'md'
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const getButtonSize = (): number => {
    switch (size) {
      case 'sm':
        return 5
      default:
        return 12
    }
  }

  const buttonSize = getButtonSize()

  return (
    <Can I='interact' a='Post'>
      {allowed => (
        <Menu
          isDisabled={allowed === false}
          size={size}
          bg='transparent'
          h={buttonSize}
          w={buttonSize}
        >
          <PostCopyLinkButton query={data} />
          <PostReportButton query={data} />
          <Can I='admin' a='Post'>
            <MenuLinkItem
              to={`/moderation/post/${data.reference}`}
              text={(
                <Trans>
                  Moderate
                </Trans>)}
              colorScheme='purple'
              icon={LoginKeys}
            />
          </Can>
        </Menu>)}
    </Can>
  )
}
