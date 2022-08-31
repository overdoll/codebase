import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchCharacterCopyLinkButtonFragment$key
} from '@//:artifacts/SearchCharacterCopyLinkButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { CopyLink } from '@//:assets/icons'

interface Props {
  query: SearchCharacterCopyLinkButtonFragment$key
}

const Fragment = graphql`
  fragment SearchCharacterCopyLinkButtonFragment on Character {
    slug
    series @required(action: THROW) {
      slug
    }
  }
`

export default function SearchCharacterCopyLinkButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const router = useRouter()

  const [, resolved] = resolveHref(router, {
    pathname: '/search/character/[seriesSlug]/[characterSlug]',
    query: {
      characterSlug: data.slug,
      seriesSlug: data.series.slug
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
