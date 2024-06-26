import { createContext, ReactNode, Suspense, useContext } from 'react'
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useUpdateEffect
} from '@chakra-ui/react'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { useRouter } from 'next/router'
import encodeJoinRedirect from '@//:modules/support/encodeJoinRedirect'
import { UrlObject } from 'url'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { useCookies } from 'react-cookie'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { graphql, useFragment } from 'react-relay/hooks'
import { JoinModalProviderFragment$key } from '@//:artifacts/JoinModalProviderFragment.graphql'
import dynamic from 'next/dynamic'
import posthog from 'posthog-js'

const Lazy = dynamic(
  async () => {
    return await import('./RootModalJoin/RootModalJoin')
  }
)

interface JoinModalContextProps {
  onOpen: () => void
}

interface JoinModalProviderProps {
  children: ReactNode
  query: JoinModalProviderFragment$key | null
}

const defaultValue = {
  onOpen: () => {
  }
}

interface SearchProps {
  token: string
}

const JoinModalContext = createContext<JoinModalContextProps>(defaultValue)

const Fragment = graphql`
  fragment JoinModalProviderFragment on Account {
    __typename
  }
`

export function JoinModalProvider (props: JoinModalProviderProps): JSX.Element {
  const {
    children,
    query
  } = props

  const data = useFragment(Fragment, query)

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const [cookies] = useCookies<string>(['token'])
  const cookieToken = cookies.token != null ? cookies.token.split(';')[0] : ''

  const {
    searchArguments,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      token: cookieToken
    }
  })

  useUpdateEffect(() => {
    if (isOpen && data != null) {
      onClose()
    }
  }, [data, isOpen])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='lg'
        isCentered
        scrollBehavior='inside'
        closeOnOverlayClick={false}
        closeOnEsc={false}
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={4}>
            <Box position='relative'>
              <Flex h={16} align='center' position='absolute' top={0} right={0}>
                <CloseButton borderRadius='lg' variant='solid' onClick={onClose} size='md' />
              </Flex>
              <Suspense fallback={<SkeletonStack />}>
                <Lazy loadQuery={loadQuery} searchArguments={searchArguments} />
              </Suspense>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <JoinModalContext.Provider value={{ onOpen }}>
        {children}
      </JoinModalContext.Provider>
    </>
  )
}

export function useJoinContext (): JoinModalContextProps {
  return useContext(JoinModalContext)
}

export function useJoin (redirect?: string | UrlObject, from?: string): () => void {
  const gotoRedirect = redirect != null ? encodeJoinRedirect(redirect) : '/join'

  const router = useRouter()

  return (): void => {
    void router.push(gotoRedirect)
    if (from != null) {
      posthog?.capture('clicked-join', { from: from })
    }
  }
}
