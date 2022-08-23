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
  const { w } = rest

  return (
    <Link passHref href={href}>
      <Box as='a' w={w}>
        <Button ref={forwardRef} w='inherit' {...rest}>
          {children}
        </Button>
      </Box>
    </Link>
  )
})

export default LinkButton
