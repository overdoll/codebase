import { createContext, ReactNode, Suspense, useContext } from 'react'
import { Box, Flex, Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { useRouter } from 'next/router'
import encodeJoinRedirect from '@//:modules/support/encodeJoinRedirect'
import { UrlObject } from 'url'
import posthog from 'posthog-js'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import RootModalJoin from './RootModalJoin/RootModalJoin'
import { useCookies } from 'react-cookie'
import { useSearch } from '@//:modules/content/HookedComponents/Search'

interface JoinModalContextProps {
  onOpen: () => void
}

interface JoinModalProviderProps {
  children: ReactNode
}

const defaultValue = {
  onOpen: () => {
  }
}

interface SearchProps {
  token: string
}

const JoinModalContext = createContext<JoinModalContextProps>(defaultValue)

export function JoinModalProvider (props: JoinModalProviderProps): JSX.Element {
  const {
    children
  } = props

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
                <RootModalJoin loadQuery={loadQuery} searchArguments={searchArguments} />
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
  const { onOpen } = useJoinContext()

  const gotoRedirect = redirect != null ? encodeJoinRedirect(redirect, from) : '/join'

  const router = useRouter()

  const onOpenJoin = (): void => {
    posthog?.capture('open-join-modal', { from: from })
    onOpen()
  }

  const onRedirectJoin = (): void => {
    void router.push(gotoRedirect)
  }

  return onOpenJoin
}
