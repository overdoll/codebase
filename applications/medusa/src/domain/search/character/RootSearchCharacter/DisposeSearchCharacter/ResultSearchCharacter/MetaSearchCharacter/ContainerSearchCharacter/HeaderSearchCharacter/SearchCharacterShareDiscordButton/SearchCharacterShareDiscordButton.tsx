import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchCharacterShareDiscordButtonFragment$key
} from '@//:artifacts/SearchCharacterShareDiscordButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialDiscord } from '@//:assets/logos'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'

interface Props {
  query: SearchCharacterShareDiscordButtonFragment$key
}

const Fragment = graphql`
  fragment SearchCharacterShareDiscordButtonFragment on Character {
    name
    slug
    series @required(action: THROW) {
      title
      slug
    }
  }
`

export default function SearchCharacterShareDiscordButton ({ query }: Props): JSX.Element {
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

  const [, onCopy] = useCopyToClipboardWrapper({
    text: `${data.name} (${data.series.title}) Rule34 NSFW videos and images on overdoll - https://overdoll.com${resolved}`,
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
