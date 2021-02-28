/**
 * @flow
 */
import type { Node } from 'react';
import { Button as ThemeUIButton } from 'theme-ui';
import { Icon } from '@//:modules/content';
import { Synchronize } from '@streamlinehq/streamline-regular/lib/interface-essential';

type Props = {
  loading?: boolean,
  children?: Node,
  sx?: any,
  disabled?: boolean,
};

export default function Button({
  sx,
  loading,
  children,
  disabled,
  ...rest
}: Props): Node {
  const loadingIcon = (
    <Icon
      icon={Synchronize.SynchronizeArrow1}
      stroke="inherit"
      sx={{ pl: 1 }}
    />
  );

  return (
    <ThemeUIButton
      {...rest}
      disabled={disabled || loading}
      sx={{
        borderWidth: 'defaults',
        borderStyle: 'solid',
        pl: 6,
        pr: 6,
        pt: 3,
        pb: 3,
        fontSize: 3,
        fontWeight: 'bold',
        fontFamily: 'heading',
        borderRadius: 'defaults',
        outline: 'none',
        '&:hover': {
          cursor: 'pointer',
        },
        '&:disabled': {
          cursor: 'not-allowed',
        },
        ...sx,
      }}
    >
      <span sx={{ display: 'flex' }}>
        <span sx={{ margin: 'auto' }}>{loading ? loadingIcon : children}</span>
      </span>
    </ThemeUIButton>
  );
}
