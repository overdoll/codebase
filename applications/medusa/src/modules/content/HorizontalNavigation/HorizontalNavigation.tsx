import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import HorizontalNavigationCenter from './HorizontalNavigationCenter/HorizontalNavigationCenter'
import HorizontalNavigationLeft from './HorizontalNavigationLeft/HorizontalNavigationLeft'
import HorizontalNavigationRight from './HorizontalNavigationRight/HorizontalNavigationRight'
import HorizontalNavigationButton from './HorizontalNavigationButton/HorizontalNavigationButton'

interface Props {
  children: ReactNode
  transparent?: boolean
}

const HorizontalNavigation = ({
  children,
  transparent = false
}: Props): JSX.Element => {
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
        bg={transparent ? 'transparent' : 'gray.800'}
      >
        {children}
      </Flex>
    </>
  )
}

export default Object.assign(HorizontalNavigation, {
  Center: HorizontalNavigationCenter,
  Left: HorizontalNavigationLeft,
  Right: HorizontalNavigationRight,
  Button: HorizontalNavigationButton
})
