import { Box, ButtonProps, Collapse as ChakraCollapse, useDisclosure, UseDisclosureProps } from '@chakra-ui/react'
import { createContext, ReactNode, useContext } from 'react'
import Button from '../../../form/Button/Button'
import { Trans } from '@lingui/macro'

type CollapseOptions = UseDisclosureProps

interface DisclosureProps {
  isOpen: boolean
  onToggle: () => void
}

interface CollapseProps extends CollapseOptions {
  children: ReactNode
}

const defaultValue = {
  isOpen: false,
  onToggle: () => {
  }
}

const CollapseContext = createContext<DisclosureProps>(defaultValue)

export const Collapse = ({
  children,
  ...rest
}: CollapseProps): JSX.Element => {
  const {
    isOpen,
    onToggle
  } = useDisclosure({ ...rest })

  const context = {
    isOpen: isOpen,
    onToggle: onToggle
  }

  return (
    <CollapseContext.Provider value={context}>
      <Box>
        {children}
      </Box>
    </CollapseContext.Provider>
  )
}

export const CollapseButton = (props: ButtonProps): JSX.Element => {
  const { onToggle } = useContext(CollapseContext)

  return (
    <Button w='100%' size='sm' onClick={onToggle} {...props}>
      {props.children == null ? <Trans>Open</Trans> : props.children}
    </Button>
  )
}

export const CollapseBody = (props: CollapseProps): JSX.Element => {
  const { isOpen } = useContext(CollapseContext)

  return (
    <ChakraCollapse style={{ overflow: isOpen ? 'visible' : 'hidden' }} animateOpacity in={isOpen} {...props}>
      <Box pt={2}>
        {props.children}
      </Box>
    </ChakraCollapse>
  )
}
