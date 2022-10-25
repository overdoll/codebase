import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ClubShareLinkButtonFragment$key } from '@//:artifacts/ClubShareLinkButtonFragment.graphql'
import { t } from '@lingui/macro'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useRouter } from 'next/router'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { CopyLink } from '@//:assets/icons'
import { useLingui } from '@lingui/react'

interface Props {
  clubQuery: ClubShareLinkButtonFragment$key
}

const ClubFragment = graphql`
  fragment ClubShareLinkButtonFragment on Club {
    slug
  }
`

export default function ClubShareLinkButton (props: Props): JSX.Element {
  const { clubQuery } = props

  const clubData = useFragment(ClubFragment, clubQuery)

  const router = useRouter()

  const { i18n } = useLingui()

  const [, resolved] = resolveHref(router, {
    pathname: '/[slug]',
    query: {
      slug: clubData.slug
    }
  }, true)

  const fullLink = `https://overdoll.com${resolved}`

  const [, onCopy] = useCopyToClipboardWrapper({ text: fullLink })

  return (
    <MenuItem onClick={onCopy} text={i18n._(t`Copy Link`)} icon={CopyLink} />
  )
}
