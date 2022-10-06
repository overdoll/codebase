import { createContext, ReactNode, useContext } from 'react'
import { Flex, Modal, ModalBody, ModalContent, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { OverdollLogo } from '@//:assets/logos'
import Icon from '../../../../../../modules/content/PageLayout/BuildingBlocks/Icon/Icon'

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

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='lg'
        isCentered
        scrollBehavior='inside'
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={3}>
            <Stack spacing={2}>
              <Flex w='100%' justify='space-between'>
                <Icon
                  icon={OverdollLogo}
                  w={12}
                  h={12}
                  fill='gray.00'
                />
                <CloseButton onClick={onClose} size='md' />
              </Flex>
            </Stack>
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

export function useJoin () {
  const joinLink
}
