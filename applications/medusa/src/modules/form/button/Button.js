/**
 * @flow
 */
import type { Node } from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

const AnimatedButton = ChakraButton;

type Props = {
  loading?: boolean,
  children?: Node,
  sx?: {},
  size?: string,
  variant?: string,
  disabled?: boolean,
  colorScheme?: string,
};

export default function Button ({
  sx,
  loading,
  children,
  disabled,
  size,
  variant,
  colorScheme,
  ...rest
}: Props): Node {
  const fullDisable = disabled || loading

  return (
    <AnimatedButton
      {...rest}
      radius="xl"
      size={!size ? 'sm' : size}
      variant={!variant ? 'solid' : variant}
      colorScheme={!colorScheme ? 'gray' : colorScheme}
      disabled={fullDisable}
      isLoading={loading}
    >
      {children}
    </AnimatedButton>
  )
}
