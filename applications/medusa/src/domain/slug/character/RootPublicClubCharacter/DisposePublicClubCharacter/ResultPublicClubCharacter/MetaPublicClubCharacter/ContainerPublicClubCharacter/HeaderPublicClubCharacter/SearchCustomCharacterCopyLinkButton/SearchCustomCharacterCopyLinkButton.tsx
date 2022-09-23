import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchCustomCharacterCopyLinkButtonFragment$key
} from '@//:artifacts/SearchCustomCharacterCopyLinkButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { CopyLink } from '@//:assets/icons'

interface Props {
  query: SearchCustomCharacterCopyLinkButtonFragment$key
}

const Fragment = graphql`
  fragment SearchCustomCharacterCopyLinkButtonFragment on Character {
    slug
    club @required(action: THROW) {
      slug
    }
  }
`

export default function SearchCustomCharacterCopyLinkButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const router = useRouter()

  const [, resolved] = resolveHref(router, {
    pathname: '/[slug]/character/[characterSlug]',
    query: {
      characterSlug: data.slug,
      slug: data.club.slug
    }
  }, true)

  const [, onCopy] = useCopyToClipboardWrapper({ text: `https://overdoll.com${resolved}` })

  return (
    <SmallGenericButton
      colorScheme='gray'
      isIcon
      onClick={onCopy}
      icon={CopyLink}
    >
      {i18n._(t`Copy Link`)}
    </SmallGenericButton>
  )
}
