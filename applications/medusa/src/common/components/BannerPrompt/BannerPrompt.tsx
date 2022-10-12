import { Box, Flex, Heading, HStack, Portal } from '@chakra-ui/react'
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
          base: 'initial',
          md: 0
        }}
        top={{
          base: 0,
          md: 'initial'
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
      <Box
        display={{
          base: 'initial',
          md: 'none'
        }}
        w='100%'
        bg='dimmers.500'
        zIndex='docked'
        h='2px'
        top={0}
        position='fixed'
      />
    </Portal>
  )
}
