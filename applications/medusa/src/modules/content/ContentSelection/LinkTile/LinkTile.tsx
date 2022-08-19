import { Box, ButtonProps } from '@chakra-ui/react'
import ClickableTile from '../ClickableTile/ClickableTile'
import { Link } from '../../../routing'
import { UrlObject } from 'url'

export interface LinkTileProps extends ButtonProps {
  href: string | UrlObject
}

export default function LinkTile ({
  href,
  children,
  w,
  ...rest
}: LinkTileProps): JSX.Element {
  return (
    <Link passHref href={href}>
      <Box w={w ?? '100%'} as='a'>
        <ClickableTile {...rest}>
          {children}
        </ClickableTile>
      </Box>
    </Link>
  )
}
