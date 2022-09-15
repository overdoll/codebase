import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchSeriesShareDiscordButtonFragment$key
} from '@//:artifacts/SearchSeriesShareDiscordButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialDiscord } from '@//:assets/logos'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'

interface Props {
  query: SearchSeriesShareDiscordButtonFragment$key
}

const Fragment = graphql`
  fragment SearchSeriesShareDiscordButtonFragment on Series {
    title
    slug
  }
`

export default function SearchSeriesShareDiscordButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const router = useRouter()

  const [, resolved] = resolveHref(router, {
    pathname: '/search/character/[seriesSlug]',
    query: {
      seriesSlug: data.slug
    }
  }, true)

  const [, onCopy] = useCopyToClipboardWrapper({
    text: `${data.title} Rule34 NSFW videos and images on overdoll - https://overdoll.com${resolved}`,
    response: i18n._(t`Copied Discord link! Send it in a channel or direct message!`)
  })

  return (
    <SmallGenericButton
      colorScheme='facebook'
      isIcon
      onClick={onCopy}
      icon={SocialDiscord}
    >
      {i18n._(t`Share on Discord`)}
    </SmallGenericButton>
  )
}
