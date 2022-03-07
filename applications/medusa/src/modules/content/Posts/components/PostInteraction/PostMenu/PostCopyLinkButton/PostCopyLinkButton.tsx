import { Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { PostCopyLinkButtonFragment$key } from '@//:artifacts/PostCopyLinkButtonFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { MenuItem } from '../../../../../ThemeComponents/Menu/Menu'
import { CopyLink } from '@//:assets/icons'
import { useCopyToClipboardWrapper } from '../../../../../../hooks'

interface Props {
  query: PostCopyLinkButtonFragment$key
}

const Fragment = graphql`
  fragment PostCopyLinkButtonFragment on Post {
    reference
  }
`

export default function PostCopyLinkButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [, onCopy] = useCopyToClipboardWrapper({ text: `https://overdoll.com/p/${data?.reference}` })

  return (
    <MenuItem
      onClick={onCopy}
      text={<Trans>Copy Link</Trans>}
      icon={CopyLink}
    />
  )
}
