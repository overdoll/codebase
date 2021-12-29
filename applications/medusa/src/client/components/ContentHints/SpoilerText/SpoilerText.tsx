import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { t } from '@lingui/macro'

interface Props {
  children: string
  text: string
}

export default function SpoilerText ({
  children,
  text
}: Props): JSX.Element {
  const {
    isOpen,
    onToggle
  } = useDisclosure()

  return (
    <Button
      fontSize='sm'
      p={0}
      onClick={onToggle}
      variant='link'
      color='gray.200'
    >
      <Flex
        w='100%'
        justify='flex-start'
      >
        <Text
          color='gray.200'
          fontSize='sm'
        >
          {isOpen ? children : (text !== '' ? text : t`Reveal Spoiler`)}
        </Text>
      </Flex>
    </Button>
  )
}
