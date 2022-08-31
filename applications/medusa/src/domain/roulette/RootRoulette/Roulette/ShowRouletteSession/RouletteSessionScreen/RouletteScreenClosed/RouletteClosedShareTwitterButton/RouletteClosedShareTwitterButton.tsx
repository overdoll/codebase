import { graphql, useFragment } from 'react-relay/hooks'
import type {
  RouletteClosedShareTwitterButtonFragment$key
} from '@//:artifacts/RouletteClosedShareTwitterButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialTwitter } from '@//:assets/logos'
import useTwitterShare from '@//:modules/support/useTwitterShare'

interface Props {
  query: RouletteClosedShareTwitterButtonFragment$key
}

const Fragment = graphql`
  fragment RouletteClosedShareTwitterButtonFragment on RouletteStatus {
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

export default function RouletteClosedShareTwitterButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const onOpen = useTwitterShare({
    url: {
      pathname: '/roulette',
      query: {
        gameSessionId: data.gameSession.reference
      }
    },
    hashtags: ['R34', 'Rule34', 'hentai', 'furry', 'NSFW', '3D'],
    text: `I scored ${data.score} on the #Rule34Roulette and lost to ${data.gameState.post.characters[0].name} by ${data.gameState.post.club.name}`
  })

  return (
    <SmallGenericButton
      colorScheme='twitter'
      isIcon
      onClick={onOpen}
      icon={SocialTwitter}
    >
      {i18n._(t`Share on Twitter`)}
    </SmallGenericButton>
  )
}
