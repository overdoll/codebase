/**
 * @flow
 */
import type { Node } from 'react'
import {
  PopoverTrigger,
  PopoverContent,
  PopoverArrow, PopoverCloseButton, PopoverBody, Popover
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { InfoCircle } from '../../../../assets/icons/interface'
import IconButton from '@//:modules/form/IconButton'

type Props = {
  text: string,
};

export default function InfoTip ({ text }: Props): Node {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          ml={1}
          size='xs'
          variant='link' mb={2}
          icon={<Icon h={3} w={3} fill='gray.100' icon={InfoCircle} />}
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
