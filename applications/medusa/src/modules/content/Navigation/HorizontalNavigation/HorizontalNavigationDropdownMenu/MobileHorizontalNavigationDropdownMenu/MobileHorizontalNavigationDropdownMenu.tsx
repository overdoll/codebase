import { ReactNode } from 'react'
import { IconType } from '@//:types/components'
import { Box, Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure, Wrap } from '@chakra-ui/react'
import { HorizontalNavigationDropdownMenuContext } from '../context'
import HorizontalNavigationButton from '../../HorizontalNavigationButton/HorizontalNavigationButton'

interface Props {
  children: ReactNode
  label: string
  icon: IconType
}

const MobileHorizontalNavigationDropdownMenu = (props: Props): JSX.Element => {
  const {
    children,
    label,
    icon
  } = props

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  return (
    <HorizontalNavigationDropdownMenuContext.Provider value={{
      onClose: onClose
    }}
    >
      <Box h='100%'>
        <HorizontalNavigationButton
          colorScheme='gray'
          icon={icon}
          isActive={isOpen}
          label={label}
          onClick={onOpen}
        />
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        preserveScrollBarGap
        scrollBehavior='inside'
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            p={3}
          >
            <Wrap justify='center' align='center'>
              {children}
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </HorizontalNavigationDropdownMenuContext.Provider>
  )
}

export default MobileHorizontalNavigationDropdownMenu
