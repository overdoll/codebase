import React, { ReactNode } from 'react'
import { IconType } from '@//:types/components'
import { Box, Flex, Modal, ModalBody, ModalContent, ModalOverlay, Stack, useDisclosure, Wrap } from '@chakra-ui/react'
import { HorizontalNavigationDropdownMenuContext } from '../context'
import HorizontalNavigationButton from '../../HorizontalNavigationButton/HorizontalNavigationButton'
import { Trans } from '@lingui/macro'
import LinkButton from '../../../../ThemeComponents/LinkButton/LinkButton'
import SiteLinkLogo from '@//:domain/app/Root/DisposeRoot/ResultRoot/UniversalNavigator/SiteLinkLogo/SiteLinkLogo'

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
                <LinkButton
                  borderRadius='md'
                  colorScheme='orange'
                  href='/supporter'
                  onClick={onClose}
                >
                  <Trans>
                    Become Supporter
                  </Trans>
                </LinkButton>
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
