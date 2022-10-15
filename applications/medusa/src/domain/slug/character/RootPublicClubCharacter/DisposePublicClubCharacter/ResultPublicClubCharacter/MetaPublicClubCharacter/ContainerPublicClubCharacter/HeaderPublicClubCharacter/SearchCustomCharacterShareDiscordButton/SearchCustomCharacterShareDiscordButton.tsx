import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchCustomCharacterShareDiscordButtonFragment$key
} from '@//:artifacts/SearchCustomCharacterShareDiscordButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialDiscord } from '@//:assets/logos'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'

interface Props {
  query: SearchCustomCharacterShareDiscordButtonFragment$key
}

const Fragment = graphql`
  fragment SearchCustomCharacterShareDiscordButtonFragment on Character {
    name
    slug
    club @required(action: THROW) {
      name
      slug
    }
  }
`

export default function SearchCustomCharacterShareDiscordButton ({ query }: Props): JSX.Element {
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

  const [, onCopy] = useCopyToClipboardWrapper({
    text: `${data.name} (OC) Rule34 NSFW videos and images on overdoll - https://overdoll.com${resolved}`,
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
