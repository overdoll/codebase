/**
 * @flow
 */

import { Node } from 'react';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import Icon from '@//:modules/content/Icon/Icon';
import { abbreviateNumber } from '@//:modules/utilities/functions';

type Props = {
  hasVoted: boolean,
  voteCount: number,
  disabled: boolean,
  onClick: () => void,
}

export default function VoteMenu({ onClick, hasVoted, voteCount, disabled }: Props): Node {
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
            icon={} w='inherit' h='inherit'
            color={hasVoted ? 'transparent' : 'gray.500'} fill={hasVoted ? 'primary.500' : 'transparent'}
          />
        }
      />
      <Heading
        display={disabled ? 'none' : 'initial'} color={hasVoted ? 'primary.500' : 'gray.500'} pl={2}
        mt={1} size='lg'
      >
        {abbreviateNumber(voteCount, 2)}
      </Heading>
    </Flex>
  );
}

VoteMenu.defaultProps = {
  hasVoted: false,
  voteCount: 0,
};
