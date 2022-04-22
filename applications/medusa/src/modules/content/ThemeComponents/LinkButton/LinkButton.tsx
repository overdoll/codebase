import { ButtonProps } from '@chakra-ui/react'
import Button from '../../../form/Button/Button'
import { Link } from '../../../routing'
import { UrlObject } from 'url'

interface Props extends ButtonProps {
  href: string | UrlObject
}

export default function LinkButton ({
  href,
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Link href={href}>
      <Button {...rest}>
        {children}
      </Button>
    </Link>
  )
}
