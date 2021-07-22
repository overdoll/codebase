/**
 * @flow
 */
import type { Node } from 'react'
import {
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow, PopoverCloseButton, PopoverBody, Popover
} from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import InterfaceAlertInformationCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/alerts/interface-alert-information-circle.svg'

type Props = {
  text: string,
  size: number,
};

export default function InfoTip ({ text }: Props): Node {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          ml={1}
          size='xs'
          variant='link' mb={2}
          icon={<Icon h={3} w={3} fill='gray.100' icon={InterfaceAlertInformationCircle} />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody textAlign='left' pr={6} fontSize='sm'>{text}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
