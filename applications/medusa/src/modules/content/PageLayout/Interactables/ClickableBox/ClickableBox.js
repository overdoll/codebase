/**
 * @flow
 */
import type { Node } from 'react';
import Button from '@//:modules/form/Button';

type Props = {
  children: string,
};

export default function ClickableBox ({ children, ...rest }: Props): Node {
  return (
    <Button
      w='100%'
      h='fill'
      size='sm'
      p={2}
      fontFamily='body'
      fontWeight='normal'
      textAlign='left'
      variant='panel'
      {...rest}
    >
      {children}
    </Button>
  )
}
