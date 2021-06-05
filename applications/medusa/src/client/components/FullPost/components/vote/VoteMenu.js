/**
 * @flow
 */

import { Node } from 'react'
import { Flex, Heading, IconButton } from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import { abbreviateNumber } from '@//:modules/utilities/functions'

import InterfaceNoFavoriteStar
  from '@streamlinehq/streamlinehq/img/streamline-mini-line/interface-favorite-star-rjt73d.svg'
import InterfaceYesFavoriteStar
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-favorite-star-gWaZoI.svg'

type Props = {
  hasVoted: boolean,
  voteCount: number,
  disabled: boolean,
}

export default function VoteMenu ({ onClick, hasVoted, voteCount, disabled }: Props): Node {
  return (
    <Flex direction='row' align='center' userSelect='none'>
      <IconButton
        borderRadius='full'
        variant='ghost'
        disabled={disabled}
        onClick={onClick}
        icon={
          <Icon
            p={2}
            icon={hasVoted ? InterfaceYesFavoriteStar : InterfaceNoFavoriteStar} w='inherit' h='inherit'
            color={hasVoted ? 'transparent' : 'gray.500'} fill={hasVoted ? 'red.500' : 'transparent'}
          />
        }
      />
      <Heading
        display={disabled ? 'none' : 'initial'} color={hasVoted ? 'red.500' : 'gray.500'} pl={2}
        mt={1} size='lg'
      >
        {abbreviateNumber(voteCount, 2)}
      </Heading>
    </Flex>
  )
}

VoteMenu.defaultProps = {
  hasVoted: false,
  voteCount: 0
}
