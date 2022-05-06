import { Box, ButtonProps } from '@chakra-ui/react'
import { ExternalLink, Link } from '../../../../routing'
import { forwardRef, ReactNode } from 'react'
import PagePanelBox from '../PagePanelBox/PagePanelBox'
import { UrlObject } from 'url'

interface Props extends ButtonProps {
  children: ReactNode
  href: string | UrlObject
  isExternal?: boolean
}

const PagePanelWrap = forwardRef(({
  href,
  children,
  isExternal = false,
  isDisabled,
  ...rest
}: Props, forwardRef): JSX.Element => {
  if (isExternal) {
    return (
      <ExternalLink href={href as string}>
        <PagePanelBox ref={forwardRef} isDisabled={isDisabled} isExternal={isExternal} {...rest}>
          {children}
        </PagePanelBox>
      </ExternalLink>
    )
  }

  return (
    <Link
      href={href}
      isDisabled={isDisabled}
      passHref
    >
      <Box as='a'>
        <PagePanelBox ref={forwardRef} isDisabled={isDisabled} isExternal={isExternal} {...rest}>
          {children}
        </PagePanelBox>
      </Box>
    </Link>
  )
})

export default PagePanelWrap
