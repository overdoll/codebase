import { t } from '@lingui/macro'
import { graphql } from 'react-relay'
import { PostShareDiscordButtonFragment$key } from '@//:artifacts/PostShareDiscordButtonFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { SocialDiscord } from '@//:assets/logos'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useLingui } from '@lingui/react'
import { getCharacterNames } from '@//:modules/support/metaHelpers'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'

interface Props {
  query: PostShareDiscordButtonFragment$key
}

const Fragment = graphql`
  fragment PostShareDiscordButtonFragment on Post {
    reference
    club {
      slug
      name
    }
    characters {
      name
    }
  }
`

export default function PostShareDiscordButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  const router = useRouter()

  const [, resolved] = resolveHref(router, {
    pathname: '/[slug]/post/[reference]',
    query: {
      slug: data.club.slug,
      reference: data.reference
    }
  }, true)

  const [, onCopy] = useCopyToClipboardWrapper({
    text: `${getCharacterNames((data.characters.map((item) => item.name).slice(0, 2)))} by ${data.club.name} - https://overdoll.com${resolved}`,
    response: i18n._(t`Copied Discord link! Send it in a channel or direct message!`)
  })

  return (
    <SmallGenericButton colorScheme='facebook' onClick={onCopy} icon={SocialDiscord}>
      {i18n._(t`Repost`)}
    </SmallGenericButton>
  )
}
