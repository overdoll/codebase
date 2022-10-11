import { Flex, Heading, HStack, Portal } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { ReactNode } from 'react'

interface Props {
  colorScheme: string
  buttonText: ReactNode
  bannerText: ReactNode
  onClick: () => void
}

export default function BannerPrompt (props: Props): JSX.Element {
  const {
    colorScheme,
    buttonText,
    bannerText,
    onClick
  } = props

  return (
    <Portal>
      <Flex
        bottom={{
          base: 54,
          md: 0
        }}
        p={1}
        zIndex='docked'
        w='100%'
        justify='center'
        bg={`${colorScheme}.400`}
        position='fixed'
      >
        <HStack w='100%' maxW='container.lg' justify='space-between' spacing={2}>
          <Heading
            fontSize={{
              base: 'sm',
              md: 'lg'
            }}
            color='gray.00'
          >
            {bannerText}
          </Heading>
          <Button flexShrink={0} onClick={onClick} borderRadius='full' size='sm' colorScheme='white'>
            {buttonText}
          </Button>
        </HStack>
      </Flex>
    </Portal>
  )
}
