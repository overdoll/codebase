/**
 * @flow
 */
import type { Node } from 'react'
import {
  IconButton
} from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'

import InterfaceArrowsVerticalExpand1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-arrows-vertical-expand-1-7yVV8A.svg'
import InterfaceArrowsShrinkVertical
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-arrows-shrink-vertical-PvJl2S.svg'

type Props = {
  isExpanded: boolean,
}

export default function ExpandButton ({ onClick, isExpanded }: Props): Node {
  return (
    <IconButton
      variant='ghost'
      w='40px'
      h='40px'
      m={2}
      onClick={onClick}
      icon={
        <Icon
          icon={!isExpanded ? InterfaceArrowsVerticalExpand1 : InterfaceArrowsShrinkVertical}
          fill='gray.100'
          w={4}
          h={4}
        />
      }
    />
  )
}
