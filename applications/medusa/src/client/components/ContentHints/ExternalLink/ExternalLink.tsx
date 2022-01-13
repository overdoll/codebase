import { HTMLChakraProps, Link } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import Button from '@//:modules/form/Button/Button'
import { ShareExternalLink } from '@//:assets/icons/interface'
import { ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  path: string
  children: ReactNode
  colorScheme?: string
}

export default function ExternalLink ({
  path,
  children,
  colorScheme = 'primary',
  ...rest
}: Props): JSX.Element {
  return (
    <Link
      href={path}
      isExternal
    >
      <Button
        size='sm'
        colorScheme={colorScheme}
        variant='link'
        {...rest}
      >
        {children}
        <Icon
          mb={1}
          ml={1}
          icon={ShareExternalLink}
          h={2}
          fill={`${colorScheme}.400`}
        />
      </Button>
    </Link>
  )
}
