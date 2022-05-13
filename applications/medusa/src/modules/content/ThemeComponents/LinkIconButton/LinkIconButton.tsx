import { Box, IconButtonProps } from '@chakra-ui/react'
import { Link } from '../../../routing'
import { UrlObject } from 'url'
import IconButton from '../../../form/IconButton/IconButton'

interface Props extends IconButtonProps {
  href: string | UrlObject
}

export default function LinkIconButton ({
  href,
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Link passHref href={href}>
      <Box as='a'>
        <IconButton {...rest} />
      </Box>
    </Link>
  )
}
