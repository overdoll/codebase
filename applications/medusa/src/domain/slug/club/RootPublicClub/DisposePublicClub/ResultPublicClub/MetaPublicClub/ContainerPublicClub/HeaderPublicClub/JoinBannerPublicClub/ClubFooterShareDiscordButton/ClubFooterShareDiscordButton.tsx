import { graphql, useFragment } from 'react-relay/hooks'
import type {
  ClubFooterShareDiscordButtonFragment$key
} from '@//:artifacts/ClubFooterShareDiscordButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useLingui } from '@lingui/react'
import { SocialDiscord } from '@//:assets/logos'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'

interface Props {
  query: ClubFooterShareDiscordButtonFragment$key
}

const Fragment = graphql`
  fragment ClubFooterShareDiscordButtonFragment on Club {
    slug
    name
  }
`

export default function ClubFooterShareDiscordButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  const router = useRouter()

  const [, resolved] = resolveHref(router, {
    pathname: '/[slug]',
    query: {
      slug: data.slug
    }
  }, true)

  const [, onCopy] = useCopyToClipboardWrapper({
    text: `${data.name} is posting their free and high quality content on overdoll - https://overdoll.com${resolved}`,
    response: i18n._(t`Copied Discord link! Send it in a channel or direct message!`)
  })

  return (
    <SmallGenericButton
      colorScheme='gray'
      onClick={onCopy}
      icon={SocialDiscord}
    >
      {i18n._(t`Share`)}
    </SmallGenericButton>
  )
}
