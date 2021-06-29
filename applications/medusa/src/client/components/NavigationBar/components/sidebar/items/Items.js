/**
 * @flow
 */
import {
  Button,
  Heading

} from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'

type Props = {
  selected: boolean,
  route: string,
  title: string,
}

export default function Items ({ selected, route, title }: Props): Node {
  return (
    <Link to={route}>
      <Button
        borderRadius={5} pt={3} pb={3}
        textAlign='left' w='100%'
        variant={selected ? 'solid' : 'ghost'}
      >
        <Heading
          color={selected ? 'gray.100' : 'gray.300'} size='sm' w='100%'
          textAlign='left'
        >
          {title}
        </Heading>
      </Button>
    </Link>
  )
}
