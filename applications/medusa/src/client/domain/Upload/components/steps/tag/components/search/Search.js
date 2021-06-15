/**
 * @flow
 */
import type { Node } from 'react'
import { Suspense, useCallback, useState } from 'react'
import { useTransition } from '@//:modules/experimental'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '../error/ErrorFallback'
import LoadingSearch from '../loading/LoadingSearch'
import {
  Center, Flex, Input, InputGroup, InputLeftElement, ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader, Modal, Heading, InputRightElement, IconButton, MenuButton
} from '@chakra-ui/react'
import Button from '@//:modules/form/button'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/icon/Icon'
import SearchCircle from '@streamlinehq/streamlinehq/img/streamline-regular/search-circle-sjsJ8a.svg'
import InterfaceDelete1 from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-delete-1-n8Oxoc.svg'

type Props = {
  children: Node,
  onClose: () => void,
  isOpen: boolean,
  header?: Node,
  placeholder?: string,
};

export default function Search ({
  placeholder,
  children,
  onClose,
  header,
  isOpen
}: Props): Node {
  const [searchInput, setSearch] = useState('')

  // useTransition({ timeoutMs: 100000000 })
  const [queryArgs, setQueryArgs] = useState({
    options: { fetchKey: 0 },
    variables: {
      data: {
        search: ''
      }
    }
  })

  const refetch = useCallback(search => {
    // Trigger a re-render of useLazyLoadQuery with new variables,
    // *and* an updated fetchKey.
    // The new fetchKey will ensure that the query is fully
    // re-evaluated and refetched.
    setQueryArgs(prev => ({
      options: {
        fetchKey: (prev?.options?.fetchKey ?? 0) + 1
      },
      variables: {
        data: {
          // fall back to data in the input if it's a refresh
          search: search || searchInput
        }
      }
    }))
  }, [])

  const onChange = e => {
    setSearch(e.target.value)
    refetch(e.target.value)

    // Start transition -
    // TODO: breaks inputs - fix it
    // startTransition(() => {
    //   refetch(e.target.value);
    // });
  }

  const clearSearch = e => {
    setSearch('')
    refetch(e.target.value)
  }

  const [t] = useTranslation('upload')

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='full'
    >
      <ModalOverlay />
      <ModalContent m={0} borderRadius={0} bg='gray.900'>
        <ModalHeader />
        <ModalCloseButton size='lg' />
        <ModalBody
          h='100%'
          w='100%'
          display='flex'
          p={0}
          align='center'
          justify='center'
          position='relative'
        >

          <Center w='100%' h='100%'>
            <Flex
              ml={[1, 0]}
              mr={[1, 0]}
              direction='column'
              w={['sm', 'md', 'lg']}
              mt={8}
              align='center'
              h='100%'
              display='absolute'
            >
              <Flex direction='column' h='100%' w='100%'>
                <Flex borderRadius={5} bg='gray.800' pt={3} pb={3} mb={4} justify='center'>
                  <Heading ml={2} mr={2} size='md' color='gray.00'>{header}</Heading>
                </Flex>
                <ErrorBoundary
                  fallback={({ error, reset }) => (
                    <ErrorFallback error={error} reset={reset} refetch={refetch} />
                  )}
                >
                  <Suspense fallback={<LoadingSearch />}>
                    {children(queryArgs)}
                  </Suspense>
                </ErrorBoundary>
              </Flex>
            </Flex>
            <Flex
              justify='center'
              direction='column'
              mb={4}
              position='fixed'
              bottom={0}
              w={['sm', 'md', 'lg']}
              ml={[1, 0]}
              mr={[1, 0]}
            >
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <Icon icon={SearchCircle} color='red.500' />
                </InputLeftElement>
                <Input
                  size='md'
                  placeholder={placeholder || t('input.search')}
                  value={searchInput}
                  onChange={onChange}
                  variant='filled'
                  mb={4}
                />
                <InputRightElement>
                  <IconButton
                    aria-label='clear'
                    hidden={!searchInput}
                    onClick={clearSearch}
                    mr={2}
                    icon={
                      <Icon
                        p={2}
                        w='inherit'
                        h='inherit'
                        icon={InterfaceDelete1}
                        fill='gray.200'
                      />
                    }
                    variant='ghost' h='1.75rem' size='sm'
                  />
                </InputRightElement>
              </InputGroup>
              <Button size='lg' w='100%' colorScheme='red' onClick={onClose}>
                {t('tag.search.close')}
              </Button>
            </Flex>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
