/**
 * @flow
 */

import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Center
} from '@chakra-ui/react'

type Props = {
  children: Node,
  title: string,
}

export default function Sidebar (props: Props): Node {
  return (
    <>
      <Center display={{ base: 'flex', md: 'none' }} mt={4}>
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
        display={{ base: 'none', md: 'initial' }}
      >
        <Button
          bg='transparent'
          pl={1} w='100%'
          mb={4}
          pr={1}
        >
          <Flex
            w='100%'
            align='center' justify='space-between'
          >
            <Heading color='gray.00' ml={1} size='md'>{props.title}</Heading>
          </Flex>
        </Button>
        <Stack spacing={2}>
          {props.children}
        </Stack>
      </Box>
      <Box pl={2} pr={4} h='calc(100vh - 54px)' w='290px' display={{ base: 'none', md: 'initial', xl: 'none' }} />
    </>
  )
}
