import { useFragment } from 'react-relay/hooks'
import type { SpinRouletteButtonFragment$key } from '@//:artifacts/SpinRouletteButtonFragment.graphql'
import { graphql } from 'react-relay'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
  query: SpinRouletteButtonFragment$key
}

const Fragment = graphql`
  fragment SpinRouletteButtonFragment on RouletteStatus {
    gameSession {
      id
      reference
      isClosed
    }
    gameState {
      __typename
    }
  }
`

export default function SpinRouletteButton (props: Props): JSX.Element {
  const {
    query,
    ...rest
  } = props

  // TODO button glows and rainbow outline when spinning is ready
  // TODO replay icon when game is finished

  const data = useFragment(Fragment, query)

  return (
    <Button {...rest}>
      <Trans>
        Spin Roulette
      </Trans>
    </Button>
  )
}
