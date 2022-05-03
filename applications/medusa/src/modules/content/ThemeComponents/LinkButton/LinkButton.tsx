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
    <Link passHref href={href}>
      <Button as='a' {...rest}>
        {children}
      </Button>
    </Link>
  )
}
