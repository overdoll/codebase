/**
 * @flow
 */
import type { Node } from 'react';
import { Heading as ThemeUIHeading } from 'theme-ui';

type Props = {
  sx?: any,
};

export default function Heading(props: Props): Node {
  return (
    <ThemeUIHeading
      {...props}
      sx={{
        ...props.sx,
      }}
    />
  );
}
