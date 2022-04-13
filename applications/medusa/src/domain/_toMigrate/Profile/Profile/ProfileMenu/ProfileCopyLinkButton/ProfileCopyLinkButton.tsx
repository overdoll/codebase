import { Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { ProfileCopyLinkButtonFragment$key } from '@//:artifacts/ProfileCopyLinkButtonFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { CopyLink } from '@//:assets/icons'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'

interface Props {
  query: ProfileCopyLinkButtonFragment$key
}

const Fragment = graphql`
  fragment ProfileCopyLinkButtonFragment on Account {
    username
  }
`

export default function ProfileCopyLinkButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [, onCopy] = useCopyToClipboardWrapper({ text: `https://overdoll.com/m/${data?.username}` })

  return (
    <MenuItem
      onClick={onCopy}
      text={<Trans>Copy Link</Trans>}
      icon={CopyLink}
    />
  )
}
