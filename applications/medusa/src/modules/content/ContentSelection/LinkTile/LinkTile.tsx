import { ButtonProps } from '@chakra-ui/react'
import ClickableTile from '../ClickableTile/ClickableTile'
import { Link } from '../../../routing'
import { UrlObject } from 'url'

interface Props extends ButtonProps {
  href: string | UrlObject
}

export default function LinkTile ({
  href,
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Link passHref href={href}>
      <ClickableTile as='a' {...rest}>
        {children}
      </ClickableTile>
    </Link>
  )
}
