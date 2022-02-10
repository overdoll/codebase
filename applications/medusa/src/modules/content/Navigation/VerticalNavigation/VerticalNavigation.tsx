import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'
import VerticalNavigationPage from './VerticalNavigationPage/VerticalNavigationPage'
import VerticalNavigationContent from './VerticalNavigationContent/VerticalNavigationContent'
import VerticalNavigationButton from './VerticalNavigationButton/VerticalNavigationButton'

interface Props {
  children: ReactNode
}

const VerticalNavigation = ({
  children
}: Props): JSX.Element => {
  return (
    <Flex direction={{
      base: 'column',
      md: 'row'
    }}
    >
      {children}
    </Flex>
  )
}

export default Object.assign(VerticalNavigation, {
  Page: VerticalNavigationPage,
  Content: VerticalNavigationContent,
  Button: VerticalNavigationButton
})
