import { Box, ButtonProps, forwardRef } from '@chakra-ui/react'
import Button from '../../../form/Button/Button'
import { Link } from '../../../routing'
import { UrlObject } from 'url'

interface Props extends ButtonProps {
  href: string | UrlObject
}

const LinkButton = forwardRef<Props, any>(({
  href,
  children,
  ...rest
}: Props, forwardRef): JSX.Element => {
  return (
    <Link passHref href={href}>
      <Box as='a'>
        <Button ref={forwardRef} {...rest}>
          {children}
        </Button>
      </Box>
    </Link>
  )
})

export default LinkButton
