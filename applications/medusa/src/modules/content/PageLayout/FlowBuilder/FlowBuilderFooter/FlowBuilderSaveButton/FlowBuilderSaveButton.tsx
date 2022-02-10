import Button from '../../../../../form/Button/Button'
import { Trans } from '@lingui/macro'
import { HTMLChakraProps } from '@chakra-ui/react'

export default function FlowBuilderSaveButton (props: HTMLChakraProps<any>): JSX.Element {
  return (
    <Button
      size='lg'
      colorScheme='green'
      variant='solid'
      {...props}
    >
      <Trans>
        Save
      </Trans>
    </Button>
  )
}
