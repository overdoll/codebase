import { Box, forwardRef, IconButtonProps } from '@chakra-ui/react'
import { Link } from '../../../routing'
import { UrlObject } from 'url'
import IconButton from '../../../form/IconButton/IconButton'

interface Props extends IconButtonProps {
  href: string | UrlObject
}

const LinkIconButton = forwardRef<Props, any>(({
  href,
  children,
  ...rest
}: Props, forwardRef): JSX.Element => {
  return (
    <Link passHref href={href}>
      <Box as='a'>
        <IconButton ref={forwardRef} {...rest} />
      </Box>
    </Link>
  )
})

export default LinkIconButton
