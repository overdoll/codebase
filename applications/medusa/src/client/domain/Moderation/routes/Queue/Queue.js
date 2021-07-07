/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Heading, Center,
  Flex, Stack, Text, CircularProgress, CircularProgressLabel
} from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import Button from '@//:modules/form/button'

import InterfaceArrowsButtonRight
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-right.svg'

export default function Queue (): Node {
  return (
    <>
      <Helmet title='queue' />
      <Center mt={8}>
        <Flex
          w={['full', 'sm', 'md', 'lg']}
          pl={[1, 0]}
          pr={[1, 0]}
          direction='column'
          mb={6}
        >
          <Heading size='lg' color='gray.00'>Moderation Queue</Heading>
          <Text size='sm' color='gray.100'>Click on a case to begin reviewing it</Text>
          <Stack mt={2}>
            <Button
              fontFamily='Noto Sans JP' variant='solid' borderRadius={5} pl={2} pr={2} pt={1} pb={1} bg='gray.800'
              h={12} align='center'
              justify='space-between'
            >
              <Flex align='center' ml={2} mr={2} w='100%' justify='space-between'>
                <Text color='gray.100' fontWeight='medium' size='md'>Case 13212332</Text>
                <Flex align='center'>
                  <CircularProgress size={8} value={50} color='green.500'>
                    <CircularProgressLabel fontSize='xs'>
                      12h
                    </CircularProgressLabel>
                  </CircularProgress>
                </Flex>
              </Flex>
              <Icon fill='gray.300' icon={InterfaceArrowsButtonRight} w={5} h='fill' />
            </Button>
          </Stack>
        </Flex>
      </Center>
    </>
  )
}
