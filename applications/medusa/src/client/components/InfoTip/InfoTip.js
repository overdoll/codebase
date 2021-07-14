/**
 * @flow
 */
import type { Node } from 'react'
import { Flex, Text, Skeleton, Tooltip } from '@chakra-ui/react'
import SuspenseImage from '@//:modules/utilities/SuspenseImage'
import Icon from '@//:modules/content/icon/Icon'
import InterfaceAlertInformationCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/alerts/interface-alert-information-circle.svg'

type Props = {
  text: string,
  size: number,
};

export default function InfoTip ({ text, size }: Props): Node {
  return (
    <Tooltip bg='gray.100' color='gray.900' label={text} fontSize='sm'>
      <Flex>
        <Icon ml={1} w={size} h={size} icon={InterfaceAlertInformationCircle} fill='gray.100' />
      </Flex>
    </Tooltip>
  )
}
