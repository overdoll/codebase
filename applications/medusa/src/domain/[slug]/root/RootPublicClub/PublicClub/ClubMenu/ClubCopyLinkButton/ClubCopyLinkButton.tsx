import { Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { ClubCopyLinkButtonFragment$key } from '@//:artifacts/ClubCopyLinkButtonFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { CopyLink } from '@//:assets/icons'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'

interface Props {
  query: ClubCopyLinkButtonFragment$key
}

const Fragment = graphql`
  fragment ClubCopyLinkButtonFragment on Club {
    slug
  }
`

export default function ClubCopyLinkButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const router = useRouter()

  const [, resolved] = resolveHref(router, {
    pathname: '/[slug]',
    query: {
      slug: data.slug
    }
  }, true)

  const [, onCopy] = useCopyToClipboardWrapper({ text: `https://overdoll.com${resolved}` })

  return (
    <MenuItem
      onClick={onCopy}
      text={<Trans>Copy Link</Trans>}
      icon={CopyLink}
    />
  )
}
