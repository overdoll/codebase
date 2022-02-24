import { Trans } from '@lingui/macro'
import { LoginKeys } from '@//:assets/icons/navigation'
import { graphql } from 'react-relay'
import { PostMenuFragment$key } from '@//:artifacts/PostMenuFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Menu, MenuLinkItem } from '../../../../ThemeComponents/Menu/Menu'
import Can from '../../../../../authorization/Can'
import PostReportButton from './PostReportButton/PostReportButton'
import { useContext } from 'react'
import { AbilityContext } from '../../../../../authorization/AbilityContext'

interface Props {
  query: PostMenuFragment$key
  size?: string
}

const Fragment = graphql`
  fragment PostMenuFragment on Post {
    reference @required(action: THROW)
    ...PostReportButtonFragment
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

  const ability = useContext(AbilityContext)

  const isDisabled = ability.cannot('interact', 'Post')

  return (
    <Menu
      isDisabled={isDisabled}
      size={size}
      bg='transparent'
      h={buttonSize}
      w={buttonSize}
    >
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
      <PostReportButton query={data} />
    </Menu>
  )
}
