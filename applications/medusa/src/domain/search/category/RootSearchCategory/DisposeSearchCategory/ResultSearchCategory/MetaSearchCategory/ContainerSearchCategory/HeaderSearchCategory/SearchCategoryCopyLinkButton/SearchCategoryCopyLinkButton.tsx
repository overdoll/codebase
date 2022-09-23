import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchCategoryCopyLinkButtonFragment$key
} from '@//:artifacts/SearchCategoryCopyLinkButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { CopyLink } from '@//:assets/icons'

interface Props {
  query: SearchCategoryCopyLinkButtonFragment$key
}

const Fragment = graphql`
  fragment SearchCategoryCopyLinkButtonFragment on Category {
    slug
  }
`

export default function SearchCategoryCopyLinkButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const router = useRouter()

  const [, resolved] = resolveHref(router, {
    pathname: '/search/category/[slug]',
    query: {
      slug: data.slug
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
