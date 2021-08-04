/**
 * @flow
 */
import {
  Button,
  Heading,
  ScaleFade
} from '@chakra-ui/react'
import NavLink from '@//:modules/routing/NavLink'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceGeometricCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/geometric-shape/interface-geometric-circle.svg'

type Props = {
  route: string,
  title: string
}

export default function LeftSidebarButton ({ route, title }: Props): Node {
  return (
    <NavLink to={route}>
      {(isActive) => (
        <Button
          borderRadius={5} pt={3} pb={3}
          textAlign='left' w='100%'
          bg={isActive ? 'gray.700' : 'transparent'}
          variant='solid'
        >
          {isActive &&
            <ScaleFade initialScale={0.1} in={isActive}>
              <Icon
                icon={InterfaceGeometricCircle} mr={2} w={1} h={1}
                fill='gray.100'
              />
            </ScaleFade>}
          <Heading
            color={isActive ? 'gray.100' : 'gray.300'} size='sm' w='100%'
            textAlign='left'
          >
            {title}
          </Heading>
        </Button>
      )}
    </NavLink>
  )
}
