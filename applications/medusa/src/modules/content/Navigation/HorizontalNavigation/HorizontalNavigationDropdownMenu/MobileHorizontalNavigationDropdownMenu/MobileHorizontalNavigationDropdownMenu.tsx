import React, { ReactNode, Suspense } from 'react'
import { IconType } from '@//:types/components'
import { Box, Flex, Modal, ModalBody, ModalContent, ModalOverlay, Stack, useDisclosure, Wrap } from '@chakra-ui/react'
import { HorizontalNavigationDropdownMenuContext } from '../context'
import HorizontalNavigationButton from '../../HorizontalNavigationButton/HorizontalNavigationButton'
import SiteLinkLogo from '@//:domain/app/Root/DisposeRoot/ResultRoot/UniversalNavigator/SiteLinkLogo/SiteLinkLogo'
import QuickAccessButtons
  from '@//:domain/app/Root/DisposeRoot/ResultRoot/UniversalNavigator/DesktopHorizontalNavigation/DesktopAlternativeMenu/QuickAccessButtons/QuickAccessButtons'

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
            <Stack spacing={2}>
              <Flex align='center' w='100%' justify='space-between'>
                <SiteLinkLogo />
                <Suspense fallback={<></>}>
                  <QuickAccessButtons />
                </Suspense>
              </Flex>
              <Wrap justify='center' align='center'>
                {children}
              </Wrap>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </HorizontalNavigationDropdownMenuContext.Provider>
  )
}

export default MobileHorizontalNavigationDropdownMenu
