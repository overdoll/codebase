import { Button } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { StateProps } from '../../../FloatingGeneralSearchButton'

interface Props extends StateProps {
  onClose: () => void
}

export default function SaveSearchButton ({
  searchValues,
  setSearchValues,
  onClose
}: Props): JSX.Element {
  const searchKeys = Object.keys(searchValues)

  if (searchKeys.length < 1) {
    return (
      <Button onClick={onClose} boxShadow='md' size='md' colorScheme='gray'>
        <Trans>
          Close
        </Trans>
      </Button>
    )
  }

  return (
    <Button boxShadow='md' size='md' colorScheme='primary'>
      <Trans>
        Save ({searchKeys.length})
      </Trans>
    </Button>
  )
}
