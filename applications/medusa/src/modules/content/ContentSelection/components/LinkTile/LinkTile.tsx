import { HTMLChakraProps } from '@chakra-ui/react'
import ClickableTile from '../ClickableTile/ClickableTile'
import { Link } from '../../../../routing'

interface Props extends HTMLChakraProps<any> {
  to: string
}

export default function LinkTile ({
  to,
  children
}: Props): JSX.Element {
  //

  return (
    <Link to={to}>
      {({ isPending }) => (
        <ClickableTile isPending={isPending}>
          {children}
        </ClickableTile>
      )}
    </Link>
  )
}
