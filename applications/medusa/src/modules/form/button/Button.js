/**
 * @flow
 */
import type { Node } from 'react';
import { Button as ThemeUIButton } from 'theme-ui';
import { Icon } from '@//:modules/content';
import { animated, useSpring } from 'react-spring';
import SynchronizeArrow1 from '@streamlinehq/streamlinehq/img/streamline-regular/synchronize-arrow-1-WipT2h.svg';
import { Config } from '@//:modules/animations';

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
  const loadingIcon = <Icon icon={SynchronizeArrow1} stroke="inherit" />;

  const AnimatedThemeUIButton = animated(ThemeUIButton);

  const fullDisable = disabled || loading;

  const [{ bubble }, setBubble] = useSpring(() => ({
    bubble: 1,
    config: Config.click,
  }));

  return (
    <AnimatedThemeUIButton
      {...rest}
      disabled={fullDisable}
      onTouchStart={
        !fullDisable
          ? () => setBubble({ bubble: 0.95 })
          : () => setBubble({ bubble: 0.99 })
      }
      onTouchEnd={() => setBubble({ bubble: 1 })}
      style={{ transform: bubble.to(v => `scale(${v})`) }}
      sx={{
        borderStyle: 'solid',
        fontWeight: 'bold',
        fontFamily: 'heading',
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
    </AnimatedThemeUIButton>
  );
}
