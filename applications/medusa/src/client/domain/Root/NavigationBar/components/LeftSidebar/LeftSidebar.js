/**
 * @flow
 */

import {
  Accordion,
  Box, Button,
  Flex, Heading, IconButton, Stack, useDisclosure,
  Slide,
  Center,
  useBreakpointValue
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'

import InterfaceArrowsButtonLeft
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-left.svg'
import InterfaceArrowsButtonRight
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-right.svg'

type Props = {
  children: Node,
  title: string,
}

export default function LeftSidebar (props: Props): Node {
  const { isOpen, onToggle } = useDisclosure()

  const windowSize = useBreakpointValue({ base: 'mobile', md: 'desktop' })

  // Render a mobile-friendly sidebar
  if (windowSize === 'mobile') {
    return (
      <Center mt={4}>
        <Flex
          w={['full', 'sm', 'md', 'lg']}
          pl={[1, 0]}
          pr={[1, 0]}
          direction='column'
        >
          <Heading mb={3} color='gray.00' ml={1} fontSize='2xl'>{props.title}</Heading>
          <Stack spacing={2}>
            {props.children}
          </Stack>
        </Flex>
      </Center>
    )
  }

  // Otherwise, render the normal sidebar
  return (
    <>
      <Flex
        display={{
          base: !isOpen ? 'block' : 'none',
          md: isOpen ? 'block' : 'none'
        }} position='fixed'
      >
        <IconButton
          mt={4}
          ml={2}
          bg='transparent'
          onClick={onToggle}
          h='42px' w='42px'
          icon={
            <Icon
              icon={InterfaceArrowsButtonRight} fill='gray.300'
              m={3}
            />
          }
        />
      </Flex>
      <Box
        bg='gray.800'
        w='260px'
        h='calc(100vh - 54px)'
        pr={4}
        pb={6}
        pl={2}
        pt={4}
        boxShadow='md'
        overflowY='auto'
        flexShrink={0}
        position={{ base: 'fixed', xl: 'fixed' }}
        zIndex='sidebar'
        display={{
          base: isOpen ? 'block' : 'none',
          md: !isOpen ? 'block' : 'none'
        }}
      >
        <Button
          bg='transparent'
          pl={1} w='100%'
          mb={4}
          pr={1}
          onClick={onToggle}
        >
          <Flex
            w='100%'
            align='center' justify='space-between'
          >
            <Heading color='gray.00' ml={1} size='md'>{props.title}</Heading>
            <Icon
              mr={1}
              icon={InterfaceArrowsButtonLeft} fill='gray.300'
              h='18px' w='18px'
            />
          </Flex>
        </Button>
        <Stack spacing={2}>
          {props.children}
        </Stack>
      </Box>
      <Box h='calc(100vh - 54px)' w='260px' display={{ base: 'initial', xl: 'none' }} />
    </>
  )
}
