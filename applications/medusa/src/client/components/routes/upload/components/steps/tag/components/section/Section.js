/**
 * @flow
 */
import type { Node } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import RootElement from '@//:modules/utilities/RootElement';
import Search from '../search/Search';
import Icon from '@//:modules/content/icon/Icon';
import { Heading, Flex, IconButton, Wrap } from '@chakra-ui/react';
import SignBadgeCircle from '@streamlinehq/streamlinehq/img/streamline-regular/sign-badge-circle-K1i3HA.svg';
import ArrowUp1 from '@streamlinehq/streamlinehq/img/streamline-bold/arrow-up-1-PopoM3.svg';
import ArrowDown1 from '@streamlinehq/streamlinehq/img/streamline-bold/arrow-down-1-n8OIDy.svg';
import Button from '@//:modules/form/button/Button';

type Props = {
  children: Node,
  search: any,
  title: string,
  count: number,
};

export default function Section({
  children,
  search,
  title,
  count,
}: Props): Node {
  const [open, setOpen] = useState(false);

  const [expand, setExpand] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onExpand = () => {
    switch (expand) {
      case true:
        setExpand(false);
        break;
      case false:
        setExpand(true);
        break;
    }
  };

  return (
    <Flex p={4} borderRadius={10} bg="gray.800" flexDirection="column">
      <Flex direction="row" justify="center">
        <Flex w="20%" align="center">
          <Icon icon={SignBadgeCircle} color="gray.50" w={12} h={12} />
          <Heading fontSize="xl" position="absolute" align="center" w={12}>
            {count}
          </Heading>
        </Flex>
        <Flex w="60%" align="center">
          <Heading fontSize="xl">{title}</Heading>
        </Flex>
        <Flex w="20%" justify="flex-end">
          <IconButton
            aria-label="Expand"
            variant="ghost"
            size="lg"
            onClick={onExpand}
            icon={<Icon icon={expand ? ArrowUp1 : ArrowDown1} fill="gray.50" />}
            isRound
          />
        </Flex>
      </Flex>
      <Flex
        display={expand ? 'flex' : 'none'}
        direction="column"
        align="center"
      >
        <Wrap m={4}>{children}</Wrap>
        <Button
          sx={{ mt: 4, width: '40%' }}
          size="medium"
          type="buttons.tertiary.alternate"
          onClick={onOpen}
        >
          Add
        </Button>
        {open &&
          createPortal(
            <Search onClose={onClose}>{args => search(args, onClose)}</Search>,
            RootElement,
          )}
      </Flex>
    </Flex>
  );
}
