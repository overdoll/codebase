import { Box, ButtonProps, forwardRef } from '@chakra-ui/react'
import Button from '../../../form/Button/Button'
import { Link } from '../../../routing'
import { UrlObject } from 'url'
import { LinkProps } from '../../../routing/Link'

interface Props extends ButtonProps {
  href: string | UrlObject
  linkProps?: Pick<LinkProps, 'scroll' | 'shallow'>
}

const LinkButton = forwardRef<Props, any>(({
  href,
  children,
  linkProps,
  ...rest
}: Props, forwardRef): JSX.Element => {
  const { w } = rest

  return (
    <Link passHref href={href} {...linkProps}>
      <Box as='a' w={w}>
        <Button ref={forwardRef} w='inherit' {...rest}>
          {children}
        </Button>
      </Box>
    </Link>
  )
})

export default LinkButton
