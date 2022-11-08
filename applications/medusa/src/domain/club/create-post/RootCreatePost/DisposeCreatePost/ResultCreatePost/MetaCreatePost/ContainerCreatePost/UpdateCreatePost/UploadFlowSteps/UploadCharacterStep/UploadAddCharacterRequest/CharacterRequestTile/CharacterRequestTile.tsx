import { ClickableTile } from '@//:modules/content/ContentSelection'
import { Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

interface Props {
  onOpen: () => void
}

export default function CharacterRequestTile (props: Props): JSX.Element {
  const { onOpen } = props

  return (
    <ClickableTile onClick={onOpen}>
      <Stack px={1} bg='gray.800' w='100%' h='100%' align='center' justify='center' spacing={1}>
        <Text textAlign='center' color='gray.00' fontSize='sm'>
          <Trans>
            Request Missing Character
          </Trans>
        </Text>
      </Stack>
    </ClickableTile>
  )
}
