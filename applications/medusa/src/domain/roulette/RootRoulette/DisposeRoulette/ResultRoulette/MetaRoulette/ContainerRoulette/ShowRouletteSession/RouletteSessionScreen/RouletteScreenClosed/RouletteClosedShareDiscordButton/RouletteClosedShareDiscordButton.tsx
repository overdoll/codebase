import { graphql, useFragment } from 'react-relay/hooks'
import type {
  RouletteClosedShareDiscordButtonFragment$key
} from '@//:artifacts/RouletteClosedShareDiscordButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialDiscord } from '@//:assets/logos'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { useRouter } from 'next/router'

interface Props {
  query: RouletteClosedShareDiscordButtonFragment$key
}

const Fragment = graphql`
  fragment RouletteClosedShareDiscordButtonFragment on RouletteStatus {
    gameSession {
      reference
    }
    gameState @required(action: THROW) {
      post {
        characters {
          name
        }
        club {
          name
        }
      }
    }
    score
  }
`

export default function RouletteClosedShareDiscordButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const router = useRouter()

  const [, resolved] = resolveHref(router, {
    pathname: '/roulette',
    query: {
      gameSessionId: data.gameSession.reference
    }
  }, true)

  const [, onCopy] = useCopyToClipboardWrapper({
    text: `I scored ${data.score} on the Rule34 Roulette and lost to ${data.gameState.post.characters[0].name} by ${data.gameState.post.club.name} - https://overdoll.com${resolved}`,
    response: i18n._(t`Copied Discord link! Send it in a channel or direct message!`)
  })

  return (
    <SmallGenericButton
      colorScheme='facebook'
      isIcon
      onClick={onCopy}
      icon={SocialDiscord}
    >
      {i18n._(t`Copy Discord Link`)}
    </SmallGenericButton>
  )
}
