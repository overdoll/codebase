import { useChoiceContext } from '@//:modules/content/HookedComponents/Choice'
import { FlowBuilderNextButton, FlowBuilderPreviousButton } from '@//:modules/content/PageLayout'
import { Box, Flex, HStack } from '@chakra-ui/react'

interface Props {
  agree: boolean
  step: string
  isAtStart: boolean
}

export default function PayoutMethodFooter ({
  isAtStart,
  agree,
  step
}: Props): JSX.Element {
  const {
    values
  } = useChoiceContext()

  const NextButton = (): JSX.Element => {
    switch (step) {
      case 'agreement':
        return (
          <FlowBuilderNextButton isDisabled={!agree} />
        )
      case 'method':
        return (
          <FlowBuilderNextButton isDisabled={Object.keys(values).length < 1} />
        )
      case 'setup':
        return (
          <></>
        )
      default:
        return <></>
    }
  }

  return (
    <Flex w='100%'>
      <HStack w='100%' justify='space-between' spacing={2}>
        {isAtStart ? <Box /> : <FlowBuilderPreviousButton />}
        <NextButton />
      </HStack>
    </Flex>
  )
}
