/**
 * @flow
 */
import type { Node } from 'react'
import { Link } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import Button from '@//:modules/form/Button'
import { ShareExternalLink } from '../../../../assets/icons/interface'

type Props = {
  path: string,
  children: string,
};

export default function ExternalLink ({ path, children }: Props): Node {
  return (
    <Link href={path} isExternal>
      <Button size='sm' colorScheme='primary' variant='link'>
        {children}
        <Icon mb={1} ml={1} icon={ShareExternalLink} h={2} fill='primary.400' />
      </Button>
    </Link>
  )
}
