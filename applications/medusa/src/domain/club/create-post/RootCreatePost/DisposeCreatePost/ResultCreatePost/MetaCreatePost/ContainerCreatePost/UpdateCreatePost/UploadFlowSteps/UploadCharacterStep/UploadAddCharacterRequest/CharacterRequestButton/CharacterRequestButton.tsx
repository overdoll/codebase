import { Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'

interface Props {
  onOpen: () => void
}

export default function CharacterRequestButton (props: Props): JSX.Element {
  const { onOpen } = props

  return (
    <Button size='md' colorScheme='gray' variant='solid' onClick={onOpen}>
      <Trans>
        Request Missing Character
      </Trans>
    </Button>
  )
}
