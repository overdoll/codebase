/**
 * @flow
 */
import type { Node } from 'react';
import { Button as ThemeUIButton } from 'theme-ui';
import { useSpring, animated } from 'react-spring';
import { Config } from '@//:modules/animations';
import { Loading } from '@//:modules/assets';

type Props = {
  loading?: boolean,
  children?: Node,
  sx?: any,
  size?: any,
  type?: any,
  disabled?: boolean,
};

export default function Button({
  sx,
  loading,
  children,
  disabled,
  size,
  type,
  ...rest
}: Props): Node {
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
      variant={[size]}
      sx={{
        borderStyle: 'solid',
        fontWeight: 'bold',
        fontFamily: 'heading',
        variant: type,
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
        <span sx={{ margin: 'auto' }}>
          {loading ? (
            <Loading color={'buttons.primary.regular.color'} />
          ) : (
            children
          )}
        </span>
      </span>
    </AnimatedThemeUIButton>
  );
}
