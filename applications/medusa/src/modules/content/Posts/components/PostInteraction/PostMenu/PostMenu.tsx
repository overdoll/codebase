import { graphql } from 'react-relay'
import { PostMenuFragment$key } from '@//:artifacts/PostMenuFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Menu } from '../../../../ThemeComponents/Menu/Menu'
import Can from '../../../../../authorization/Can'
import PostReportButton from './PostReportButton/PostReportButton'
import PostCopyLinkButton from './PostCopyLinkButton/PostCopyLinkButton'
import PostViewButton from './PostViewButton/PostViewButton'
import PostModerateButton from './PostModerateButton/PostModerateButton'
import { ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
  query: PostMenuFragment$key
}

const Fragment = graphql`
  fragment PostMenuFragment on Post {
    ...PostReportButtonFragment
    ...PostCopyLinkButtonFragment
    ...PostViewButtonFragment
    ...PostModerateButtonFragment
    state
  }
`

export default function PostMenu ({
  query,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Can I='interact' a='Post'>
      {allowed => (
        <Menu
          isDisabled={allowed === false}
          {...rest}
        >
          {data.state === 'PUBLISHED' && (
            <>
              <PostViewButton query={data} />
              <PostCopyLinkButton query={data} />
              <PostReportButton query={data} />
            </>)}
          <PostModerateButton query={data} />
        </Menu>)}
    </Can>
  )
}
