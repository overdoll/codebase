import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import HorizontalNavigationCenter from './HorizontalNavigationCenter/HorizontalNavigationCenter'
import HorizontalNavigationLeft from './HorizontalNavigationLeft/HorizontalNavigationLeft'
import HorizontalNavigationRight from './HorizontalNavigationRight/HorizontalNavigationRight'
import HorizontalNavigationButton from './HorizontalNavigationButton/HorizontalNavigationButton'
import { RenderOnDesktop, RenderOnMobile } from '../../PageLayout'
import RouterLoadingBar from '../../../../domain/app/Root/RouterLoadingBar/RouterLoadingBar'
import JoinPopup from '@//:domain/app/Root/UniversalNavigator/JoinPopup/JoinPopup'

interface Props {
  children: ReactNode
}

const HorizontalNavigation = ({
  children
}: Props): JSX.Element => {
  return (
    <>
      <RouterLoadingBar />
      <RenderOnDesktop>
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
      </RenderOnDesktop>
      <RenderOnMobile>
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
      </RenderOnMobile>
    </>
  )
}

export default Object.assign(HorizontalNavigation, {
  Center: HorizontalNavigationCenter,
  Left: HorizontalNavigationLeft,
  Right: HorizontalNavigationRight,
  Button: HorizontalNavigationButton
})
