import { createContext, ReactNode, Suspense, useContext, useEffect, useState } from 'react'
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
import posthog from 'posthog-js'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { useCookies } from 'react-cookie'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { graphql, useFragment } from 'react-relay/hooks'
import { JoinModalProviderFragment$key } from '@//:artifacts/JoinModalProviderFragment.graphql'
import dynamic from 'next/dynamic'

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
  const { onOpen } = useJoinContext()
  const [canFlag, setCanFlag] = useState(false)

  const gotoRedirect = redirect != null ? encodeJoinRedirect(redirect, from) : '/join'

  const router = useRouter()

  const onOpenJoin = (): void => {
    posthog?.capture('open-join-modal', { from: from })
    onOpen()
  }

  const onRedirectJoin = (): void => {
    void router.push(gotoRedirect)
  }

  useEffect(() => {
    posthog.onFeatureFlags(() => {
      setCanFlag(true)
    })
  }, [])

  if (!canFlag) {
    return onRedirectJoin
  }

  if (posthog?.getFeatureFlag('join-modal') === 'control') {
    return onRedirectJoin
  }

  if (posthog?.getFeatureFlag('join-modal') === 'test_modal') {
    return onOpenJoin
  }

  return onRedirectJoin
}
