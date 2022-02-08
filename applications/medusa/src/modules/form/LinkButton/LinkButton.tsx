import { ButtonProps } from '@chakra-ui/react'
import Button from '../Button/Button'
import { Link } from '../../routing'

interface Props extends ButtonProps {
  to: string
}

export default function LinkButton ({
  to,
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Link to={to}>
      {({ isPending }) => (
        <Button {...rest} isLoading={isPending}>
          {children}
        </Button>
      )}
    </Link>
  )
}
