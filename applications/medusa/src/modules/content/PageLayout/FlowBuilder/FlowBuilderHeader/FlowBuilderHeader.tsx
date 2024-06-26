import { Flex, Heading, HStack } from '@chakra-ui/react'
import { ReactNode, useContext } from 'react'
import { FlowContext } from '../FlowBuilder'
import Icon from '../../BuildingBlocks/Icon/Icon'
import { useLingui } from '@lingui/react'
import { IconType, MaybeRenderProp } from '@//:types/components'
import runIfFunction from '../../../../support/runIfFunction'

interface ChildrenCallable {
  currentTitle: ReactNode
  currentIcon: IconType
}

interface Props {
  children?: MaybeRenderProp<ChildrenCallable>
}

export default function FlowBuilderHeader ({ children }: Props): JSX.Element {
  const {
    currentStep,
    stepsHeaders,
    colorScheme
  } = useContext(FlowContext)

  const { i18n } = useLingui()

  if (stepsHeaders == null) {
    return <></>
  }

  const icon = stepsHeaders[currentStep].icon
  const title = stepsHeaders[currentStep].title

  if (children == null) {
    return (
      <HStack spacing={4}>
        <Flex
          p={2}
          h={12}
          w={12}
          borderRadius='md'
          bg={`${colorScheme as string}.300`}
          align='center'
          justify='center'
        >
          <Icon
            icon={icon}
            fill='gray.00'
          />
        </Flex>
        <Heading
          fontSize='3xl'
          color='gray.00'
        >
          {i18n._(title)}
        </Heading>
      </HStack>
    )
  }

  return (
    <Flex>
      {runIfFunction(children, {
        currentTitle: title,
        currentIcon: icon
      })}
    </Flex>
  )
}
