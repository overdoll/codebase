import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubShareDiscordButtonFragment$key } from '@//:artifacts/ClubShareDiscordButtonFragment.graphql'
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useLingui } from '@lingui/react'
import { SocialDiscord } from '@//:assets/logos'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'

interface Props {
  query: ClubShareDiscordButtonFragment$key
}

const Fragment = graphql`
  fragment ClubShareDiscordButtonFragment on Club {
    slug
    name
  }
`

export default function ClubShareDiscordButton ({ query }: Props): JSX.Element {
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
    <MenuItem onClick={onCopy} text={i18n._(t`Share on Discord`)} icon={SocialDiscord} />
  )
}
