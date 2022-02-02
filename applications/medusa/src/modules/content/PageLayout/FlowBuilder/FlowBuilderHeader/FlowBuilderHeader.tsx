import { Flex, Heading, HStack } from '@chakra-ui/react'
import { FunctionComponent, ReactNode, useContext } from 'react'
import { FlowContext } from '../FlowBuilder'
import Icon from '../../Flair/Icon/Icon'

interface ChildrenCallable {
  currentTitle: ReactNode
  currentIcon: FunctionComponent<any>
}

interface Props {
  children?: (ChildrenCallable: ChildrenCallable) => ReactNode | null
}

export default function FlowBuilderHeader ({ children }: Props): JSX.Element {
  const {
    currentStep,
    stepsHeaders,
    colorScheme
  } = useContext(FlowContext)

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
          bg={`${colorScheme as string}.400`}
          align='center'
          justify='center'
        >
          <Icon
            icon={icon}
            fill='gray.00'
          />
        </Flex>
        <Heading
          whiteSpace='nowrap'
          textOverflow='ellipsis'
          overflow='hidden'
          fontSize='3xl'
          color='gray.00'
        >
          {title}
        </Heading>
      </HStack>
    )
  }

  return (
    <Flex>
      {children?.({
        currentTitle: title,
        currentIcon: icon
      })}
    </Flex>
  )
}
