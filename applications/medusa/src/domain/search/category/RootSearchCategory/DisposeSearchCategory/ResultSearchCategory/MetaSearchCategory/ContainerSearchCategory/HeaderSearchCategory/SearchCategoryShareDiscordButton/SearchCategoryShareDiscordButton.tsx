import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchCategoryShareDiscordButtonFragment$key
} from '@//:artifacts/SearchCategoryShareDiscordButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialDiscord } from '@//:assets/logos'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'

interface Props {
  query: SearchCategoryShareDiscordButtonFragment$key
}

const Fragment = graphql`
  fragment SearchCategoryShareDiscordButtonFragment on Category {
    title
    slug
  }
`

export default function SearchCategoryShareDiscordButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const router = useRouter()

  const [, resolved] = resolveHref(router, {
    pathname: '/search/category/[categorySlug]',
    query: {
      slug: data.slug
    }
  }, true)

  const [, onCopy] = useCopyToClipboardWrapper({
    text: `${data.title} Rule34 NSFW videos and images on overdoll - https://overdoll.com${resolved}`,
    response: i18n._(t`Copied Discord link! Send it in a channel or direct message!`)
  })

  return (
    <SmallGenericButton
      colorScheme='facebook'
      onClick={onCopy}
      icon={SocialDiscord}
    >
      {i18n._(t`Share`)}
    </SmallGenericButton>
  )
}
