import { createContext, ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'
import VerticalNavigationPage from './VerticalNavigationPage/VerticalNavigationPage'
import VerticalNavigationContent from './VerticalNavigationContent/VerticalNavigationContent'
import VerticalNavigationButton from './VerticalNavigationButton/VerticalNavigationButton'
import VerticalNavigationGroup from './VerticalNavigationGroup/VerticalNavigationGroup'

interface Props {
  children: ReactNode
}

interface VerticalNavigationContextProps {
  isExtended: boolean
}

const defaultValue = {
  isExtended: false
}

export const VerticalNavigationContext = createContext<VerticalNavigationContextProps>(defaultValue)

const VerticalNavigation = ({
  children
}: Props): JSX.Element => {
  const isExtended = children?.[1] != null && children[1]?.props?.children === undefined

  const contextValue = {
    isExtended
  }

  return (
    <VerticalNavigationContext.Provider value={contextValue}>
      <Flex direction={isExtended
        ? 'column'
        : {
            base: 'column',
            md: 'row'
          }}
      >
        {children}
      </Flex>
    </VerticalNavigationContext.Provider>
  )
}

export default Object.assign(VerticalNavigation, {
  Page: VerticalNavigationPage,
  Content: VerticalNavigationContent,
  Button: VerticalNavigationButton,
  Group: VerticalNavigationGroup
})
