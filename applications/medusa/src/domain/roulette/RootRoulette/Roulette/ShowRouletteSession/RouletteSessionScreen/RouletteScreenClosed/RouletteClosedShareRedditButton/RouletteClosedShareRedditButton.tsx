import { graphql, useFragment } from 'react-relay/hooks'
import type {
  RouletteClosedShareRedditButtonFragment$key
} from '@//:artifacts/RouletteClosedShareRedditButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialReddit } from '@//:assets/logos'
import useRedditShare from '@//:modules/support/useRedditShare'

interface Props {
  query: RouletteClosedShareRedditButtonFragment$key
}

const Fragment = graphql`
  fragment RouletteClosedShareRedditButtonFragment on RouletteStatus {
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

export default function RouletteClosedShareRedditButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const onOpen = useRedditShare({
    url: {
      pathname: '/roulette',
      query: {
        gameSessionId: data.gameSession.reference
      }
    },
    title: `I scored ${data.score} on the Rule34 Roulette and lost to ${data.gameState.post.characters[0].name} by ${data.gameState.post.club.name}`
  })

  return (
    <SmallGenericButton
      colorScheme='red'
      isIcon
      onClick={onOpen}
      icon={SocialReddit}
    >
      {i18n._(t`Share on Reddit`)}
    </SmallGenericButton>
  )
}
