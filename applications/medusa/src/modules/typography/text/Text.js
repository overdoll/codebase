/**
 * @flow
 */
import type { Node } from 'react';

import { Text as ThemeUIText } from 'theme-ui';

type Props = {
  sx?: any,
};

export default function Text(props: Props): Node {
  return <ThemeUIText {...props} sx={{ ...props.sx }} />;
}
