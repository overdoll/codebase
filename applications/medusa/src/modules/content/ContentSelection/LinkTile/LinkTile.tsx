import { Box, ButtonProps } from '@chakra-ui/react'
import ClickableTile from '../ClickableTile/ClickableTile'
import { ExternalLink, Link } from '../../../routing'
import { UrlObject } from 'url'
import { LinkProps as NextLinkProps } from 'next/dist/client/link'

export interface LinkTileProps extends ButtonProps {
  href: string | UrlObject
  linkProps?: Omit<NextLinkProps, 'href'>
  isExternal?: boolean
}

export default function LinkTile (props: LinkTileProps): JSX.Element {
  const {
    href,
    children,
    w,
    linkProps,
    h,
    isExternal = false,
    ...rest
  } = props

  if (isExternal) {
    return (
      <ExternalLink href={href as string}>
        <ClickableTile {...rest}>
          {children}
        </ClickableTile>
      </ExternalLink>
    )
  }

  return (
    <Link passHref href={href} {...linkProps}>
      <Box w={w ?? '100%'} h={h ?? undefined} as='a'>
        <ClickableTile {...rest}>
          {children}
        </ClickableTile>
      </Box>
    </Link>
  )
}
