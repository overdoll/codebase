import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubFooterCopyLinkButtonFragment$key } from '@//:artifacts/ClubFooterCopyLinkButtonFragment.graphql'
import { t } from '@lingui/macro'
import { CopyLink } from '@//:assets/icons'
import ClubFooterButton from '../ClubFooterButton/ClubFooterButton'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { useLingui } from '@lingui/react'

interface Props {
  query: ClubFooterCopyLinkButtonFragment$key
}

const Fragment = graphql`
  fragment ClubFooterCopyLinkButtonFragment on Club {
    slug
  }
`

export default function ClubFooterCopyLinkButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const router = useRouter()

  const { i18n } = useLingui()

  const [, resolved] = resolveHref(router, {
    pathname: '/[slug]',
    query: {
      slug: data.slug
    }
  }, true)

  const [, onCopy] = useCopyToClipboardWrapper({ text: `https://overdoll.com${resolved}` })

  return (
    <ClubFooterButton
      onClick={onCopy}
      isIcon
      icon={CopyLink}
    >
      {i18n._(t`Copy Link`)}
    </ClubFooterButton>
  )
}
