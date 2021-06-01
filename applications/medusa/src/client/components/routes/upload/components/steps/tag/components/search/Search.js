/**
 * @flow
 */
import type { Node } from 'react'
import { Suspense, useCallback, useState, useRef } from 'react'
import { useTransition } from '@//:modules/experimental'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '../error/ErrorFallback'
import LoadingSearch from '../loading/LoadingSearch'
import {
  Center,
  Flex,
  Input,
  Progress,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'
import Button from '@//:modules/form/button/Button'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/icon/Icon'
import SearchCircle from '@streamlinehq/streamlinehq/img/streamline-regular/search-circle-sjsJ8a.svg'

type Props = {
  children: Node,
  onClose?: () => void,
  header?: Node,
  placeholder?: string,
};

export default function Search ({
  placeholder,
  children,
  onClose,
  header
}: Props): Node {
  const [searchInput, setSearch] = useState('')
  const [isPending] = useTransition({ timeoutMs: 100000000 })

  const textInput = useRef(null)

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

  const [t] = useTranslation('general')

  return (
    <Flex
      direction='column'
      w='100%'
      h='100%'
      bg='gray.800'
      position='fixed'
      top={0}
    >
      <Flex w='100%' position='fixed' display='absolute'>
        {isPending
          ? (
            <Progress size='xs' isIndeterminate colorScheme='purple' />
            )
          : (
              ''
            )}
      </Flex>
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
            {header}
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
              id={placeholder}
              name={placeholder}
              ref={textInput}
              placeholder={placeholder || t('input.search')}
              value={searchInput}
              onChange={onChange}
              variant='filled'
              isDisabled={!!isPending}
              mb={4}
            />
          </InputGroup>
          <Button size='lg' w='100%' colorScheme='red' onClick={onClose}>
            {t('button.close')}
          </Button>
        </Flex>
      </Center>
    </Flex>
  )
}
