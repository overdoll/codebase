import { Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { PostCopyLinkButtonFragment$key } from '@//:artifacts/PostCopyLinkButtonFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { MenuItem } from '../../../../../ThemeComponents/Menu/Menu'
import { CopyLink } from '@//:assets/icons'
import { useCopyToClipboardWrapper } from '../../../../../../hooks'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'

interface Props {
  query: PostCopyLinkButtonFragment$key
}

const Fragment = graphql`
  fragment PostCopyLinkButtonFragment on Post {
    reference
    club {
      slug
    }
  }
`

export default function PostCopyLinkButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const router = useRouter()

  const { basePath } = router

  const [, resolved] = resolveHref(router, {
    pathname: '/[slug]/p/[reference]',
    query: {
      slug: data.club.slug,
      reference: data.reference
    }
  }, true)

  const [, onCopy] = useCopyToClipboardWrapper({ text: `${basePath}${resolved}` })

  return (
    <MenuItem
      onClick={onCopy}
      text={<Trans>Copy Link</Trans>}
      icon={CopyLink}
    />
  )
}
