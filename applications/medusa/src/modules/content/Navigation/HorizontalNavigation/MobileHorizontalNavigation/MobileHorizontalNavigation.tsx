import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import MobileHorizontalNavigationCenter from './MobileHorizontalNavigationCenter/MobileHorizontalNavigationCenter'
import HorizontalNavigationLeft from '../HorizontalNavigationLeft/HorizontalNavigationLeft'
import HorizontalNavigationRight from '../HorizontalNavigationRight/HorizontalNavigationRight'
import HorizontalNavigationButton from '../HorizontalNavigationButton/HorizontalNavigationButton'

interface Props {
  children: ReactNode
}

const MobileHorizontalNavigation = (props: Props): JSX.Element => {
  const {
    children
  } = props

  return (
    <Flex
      zIndex='docked'
      boxShadow='sm-top'
      align='center'
      right={0}
      left={0}
      bottom={0}
      position='fixed'
      h={54}
      bg='gray.800'
    >
      {children}
    </Flex>
  )
}

export default Object.assign(MobileHorizontalNavigation, {
  Center: MobileHorizontalNavigationCenter,
  Left: HorizontalNavigationLeft,
  Right: HorizontalNavigationRight,
  Button: HorizontalNavigationButton
})
