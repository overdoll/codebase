/**
 * @flow
 */
import {
  Button,
  Heading
} from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'

type Props = {
  route: string,
  title: string,
  match: boolean,
}

export default function SidebarItem ({ route, title, match }: Props): Node {
  return (
    <Link to={route}>
      <Button
        borderLeftColor={match && 'red.500'}
        borderLeftWidth={match && 3}
        borderRadius={5} pt={3} pb={3}
        textAlign='left' w='100%'
        bg={match ? 'gray.700' : 'transparent'}
        variant='solid'
      >
        <Heading
          color={match ? 'gray.100' : 'gray.300'} size='sm' w='100%'
          textAlign='left'
        >
          {title}
        </Heading>
      </Button>
    </Link>
  )
}
