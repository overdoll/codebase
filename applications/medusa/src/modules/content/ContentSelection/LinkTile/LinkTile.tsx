import { Box, ButtonProps } from '@chakra-ui/react'
import ClickableTile from '../ClickableTile/ClickableTile'
import { Link } from '../../../routing'
import { UrlObject } from 'url'
import { LinkProps as NextLinkProps } from 'next/dist/client/link'

export interface LinkTileProps extends ButtonProps {
  href: string | UrlObject
  linkProps?: Omit<NextLinkProps, 'href'>
}

export default function LinkTile ({
  href,
  children,
  w,
  linkProps,
  ...rest
}: LinkTileProps): JSX.Element {
  return (
    <Link passHref href={href} {...linkProps}>
      <Box w={w ?? '100%'} as='a'>
        <ClickableTile {...rest}>
          {children}
        </ClickableTile>
      </Box>
    </Link>
  )
}
