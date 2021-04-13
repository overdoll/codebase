/**
 * @flow
 */
import type { Node } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import RootElement from '@//:modules/utilities/RootElement';
import Search from '../search/Search';
import Icon from '@//:modules/content/icon/Icon';
import Heading from '@//:modules/typography/heading/Heading';
import Text from '@//:modules/typography/text/Text';
import { SignShapes } from '@streamlinehq/streamline-regular/lib/maps-navigation';
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
    <div
      sx={{
        borderRadius: 10,
        padding: 4,
        marginBottom: 2,
        backgroundColor: 'neutral.800',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div sx={{ display: 'flex', flexDirection: 'row' }}>
        <span
          sx={{
            flexGrow: 2,
            justifyContent: 'flex-start',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon
              icon={SignShapes.SignBadgeCircle}
              strokeWidth={2.5}
              stroke={'neutral.50'}
              size={40}
            />
            <Heading
              sx={{
                position: 'absolute',
                fontSize: 3,
              }}
            >
              {count}
            </Heading>
          </span>
        </span>
        <span
          sx={{
            flexGrow: 6,
            alignItems: 'center',
            display: 'flex',
            width: '50%',
          }}
        >
          <Heading sx={{ fontSize: 4 }}>{title}</Heading>
        </span>
        <span
          onClick={onExpand}
          sx={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Icon
            icon={SignShapes.SignBadgeCircle}
            strokeWidth={3}
            stroke={'neutral.50'}
            size={30}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          />
        </span>
      </div>
      <div
        sx={{
          display: expand ? 'flex' : 'none',
          marginTop: 4,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
        <Button
          sx={{ mt: 4, width: '40%' }}
          size={'medium'}
          type={'buttons.tertiary.alternate'}
          onClick={onOpen}
        >
          Add
        </Button>
        {open &&
          createPortal(
            <Search onClose={onClose}>{args => search(args, onClose)}</Search>,
            RootElement,
          )}
      </div>
    </div>
  );
}
