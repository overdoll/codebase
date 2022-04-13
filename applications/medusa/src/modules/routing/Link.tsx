import { ReactNode } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

export interface LinkProps extends NextLinkProps {
  children: ReactNode
  isDisabled?: boolean
}

export default function Link ({
  children,
  isDisabled = false,
  ...rest
}: LinkProps): JSX.Element {
  if (isDisabled) {
    return (
      <span>
        {children}
      </span>
    )
  }

  return (
    <NextLink
      {...rest}
    >
      {children}
    </NextLink>
  )
}
