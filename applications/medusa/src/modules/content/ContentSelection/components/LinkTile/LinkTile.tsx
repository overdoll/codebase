import { HTMLChakraProps } from '@chakra-ui/react'
import ClickableTile from '../ClickableTile/ClickableTile'
import { Link } from '../../../../routing'

interface Props extends HTMLChakraProps<any> {
  to: string
}

export default function LinkTile ({
  to,
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Link to={to}>
      {({ isPending }) => (
        <ClickableTile isPending={isPending} {...rest}>
          {children}
        </ClickableTile>
      )}
    </Link>
  )
}
