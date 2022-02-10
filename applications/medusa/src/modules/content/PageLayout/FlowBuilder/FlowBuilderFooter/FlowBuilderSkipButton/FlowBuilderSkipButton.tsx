import Button from '../../../../../form/Button/Button'
import { Trans } from '@lingui/macro'
import { HTMLChakraProps } from '@chakra-ui/react'

export default function FlowBuilderSkipButton (props: HTMLChakraProps<any>): JSX.Element {
  return (
    <Button
      size='lg'
      colorScheme='gray'
      variant='ghost'
      {...props}
    >
      <Trans>
        Skip
      </Trans>
    </Button>
  )
}
