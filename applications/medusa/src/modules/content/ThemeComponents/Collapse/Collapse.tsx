import {
  ButtonProps,
  Collapse as ChakraCollapse,
  useDisclosure,
  UseDisclosureProps,
  UseDisclosureReturn
} from '@chakra-ui/react'
import { createContext, ReactNode, useContext } from 'react'
import Button from '../../../form/Button/Button'
import { Trans } from '@lingui/macro'

type CollapseOptions = UseDisclosureProps

interface DisclosureProps {
  isOpen: boolean
  onToggle: () => void
}

interface CollapseProps extends CollapseOptions{
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
      {children}
    </CollapseContext.Provider>
  )
}

export const CollapseButton = (props: ButtonProps): JSX.Element => {
  const { onToggle } = useContext(CollapseContext)

  return (
    <Button size='sm' onClick={onToggle} {...props}>
      {props.children == null ? <Trans>Open</Trans> : props.children}
    </Button>
  )
}

export const CollapseBody = (props: CollapseProps): JSX.Element => {
  const { isOpen } = useContext(CollapseContext)

  return (
    <ChakraCollapse animateOpacity in={isOpen} {...props}>
      {props.children}
    </ChakraCollapse>
  )
}
