import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'
import HorizontalNavigationLeft from '../HorizontalNavigationLeft/HorizontalNavigationLeft'
import HorizontalNavigationRight from '../HorizontalNavigationRight/HorizontalNavigationRight'
import HorizontalNavigationButton from '../HorizontalNavigationButton/HorizontalNavigationButton'
import DesktopHorizontalNavigationCenter from './DesktopHorizontalNavigationCenter/DesktopHorizontalNavigationCenter'

interface Props {
  children: ReactNode
}

const DesktopHorizontalNavigation = (props: Props): JSX.Element => {
  const {
    children
  } = props

  return (
    <>
      <Flex
        align='center'
        right={0}
        left={0}
        top={0}
        h={54}
      />
      <Flex
        zIndex='docked'
        boxShadow='sm'
        align='center'
        right={0}
        left={0}
        top={0}
        position='fixed'
        h={54}
        bg='gray.800'
      >
        {children}
      </Flex>
    </>
  )
}

export default Object.assign(DesktopHorizontalNavigation, {
  Center: DesktopHorizontalNavigationCenter,
  Left: HorizontalNavigationLeft,
  Right: HorizontalNavigationRight,
  Button: HorizontalNavigationButton
})
