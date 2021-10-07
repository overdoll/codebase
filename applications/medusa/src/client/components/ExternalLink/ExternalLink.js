/**
 * @flow
 */
import type { Node } from 'react'
import { Link, Flex } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import ShareExternalLink1
  from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/share/share-external-link-1.svg'

type Props = {
  path: string,
  children: string,
};

export default function ExternalLink ({ path, children }: Props): Node {
  return (
    <Flex align='center'>
      <Link href={path} isExternal>
        {children}
      </Link>
      <Icon mb={1} ml={1} icon={ShareExternalLink1} h={2} fill='primary.500' />
    </Flex>
  )
}
