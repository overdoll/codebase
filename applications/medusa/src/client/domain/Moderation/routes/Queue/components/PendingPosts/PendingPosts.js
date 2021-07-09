/**
 * @flow
 */

import { usePreloadedQuery } from 'react-relay'
import type { QueuePendingPostsQuery } from '@//:artifacts/QueuePendingPostsQuery.graphql'
import { PreloadedQuery } from 'react-relay/hooks'
import Button from '@//:modules/form/button'
import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Stack,
  Text,
  IconButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Heading
} from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import InterfaceArrowsButtonRight
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-right.svg'
import InterfaceArrowsButtonLeft
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-left.svg'
import InterfaceValidationCheck
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check.svg'
import InterfaceValidationCheckCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check-circle.svg'
import InterfaceValidationCheckSquare1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check-square-1.svg'

type Props = {
  query: QueuePendingPostsQuery,
  queryRef: PreloadedQuery<QueuePendingPostsQuery>
}

export default function ({ query, queryRef }: Props): Node {
  const pendingPosts = usePreloadedQuery<QueuePendingPostsQuery>(
    query,
    queryRef
  )

  return (
    pendingPosts.edges?.length > 0
      ? <>
        <Text size='sm' color='gray.100'>Click on a case to begin reviewing it</Text>
        <Flex mt={2}>
          <IconButton
            icon={<Icon icon={InterfaceArrowsButtonLeft} w='fill' h='fill' fill='gray.300' />}
            variant='solid' borderRadius={5} pl={2} pr={2} pt={1} pb={1} bg='gray.800'
            h={12}
            mr={1}
          />
          <Flex
            borderRadius={5} h={12} pl={2} pr={2} pt={1} pb={1} w='100%' bg='gray.800'
            align='center'
            justify='center'
          >
            <Text color='gray.300' fontWeight='medium' size='md'>Case 13212332</Text>
          </Flex>
          <IconButton
            ml={1}
            icon={<Icon icon={InterfaceArrowsButtonRight} w='fill' h='fill' fill='gray.300' />}
            variant='ghost' borderRadius={5} pl={2} pr={2} pt={1} pb={1}
            h={12}
          />
        </Flex>
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
      </>
      : <>
        <Flex
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='500px'
          mt={4}
          p={12}
          bg='gray.800'
          borderRadius={10}
        >
          <Icon w={12} h={12} icon={InterfaceValidationCheckSquare1} fill='green.300' />
          <Heading color='gray.00' fontWeight='normal' size='xl' mt={8} mb={1}>
            All Clear
          </Heading>
          <Text color='gray.200'>
            There are no posts in your queue at the moment. Try checking again tomorrow?
          </Text>
        </Flex>
      </>

  )
}
