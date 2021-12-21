import { Link } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import Button from '@//:modules/form/Button/Button'
import { ShareExternalLink } from '@//:assets/icons/interface'
import { ReactNode } from 'react'

interface Props {
  path: string
  children: ReactNode
}

export default function ExternalLink ({
  path,
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Link
      href={path}
      isExternal
    >
      <Button
        size='sm'
        colorScheme='primary'
        variant='link'
        {...rest}
      >
        {children}
        <Icon
          mb={1}
          ml={1}
          icon={ShareExternalLink}
          h={2}
          fill='primary.400'
        />
      </Button>
    </Link>
  )
}
