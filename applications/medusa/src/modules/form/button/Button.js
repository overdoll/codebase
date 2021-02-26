/**
 * @flow
 */
import type { Node } from 'react';
import { Button as ThemeUIButton } from 'theme-ui';
import { Icon } from '@//:modules/content';
import { Loading } from '@streamlinehq/streamline-regular/lib/interface-essential';

type Props = {
  loading?: boolean,
  children?: Node,
  sx?: any,
};

export default function Button({ sx, loading, children, ...rest }: Props): Node {

  return (
    <ThemeUIButton
      {...rest}
      sx={{
        borderWidth: 'defaults',
        borderStyle: 'solid',
        pl: 6,
        pr: 6,
        pt: 3,
        pb: 3,
        fontSize: 2,
        fontWeight: 'bold',
        fontFamily: 'heading',
        borderRadius: 'defaults',
        outline: 'none',
        '&:hover': {
          cursor: 'pointer',
        },
        ...sx,
      }}
    >
      <span sx={{ display: 'flex' }}>
        <span sx={{ margin: 'auto' }}>
          {children}
          {loading && (
            <Icon
              icon={Loading.LoadingCircle}
              stroke="neutral.100"
              sx={{ pl: 1 }}
            />
          )}
        </span>
      </span>
    </ThemeUIButton>
  );
}
