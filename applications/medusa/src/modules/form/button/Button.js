/**
 * @flow
 */
import type { Node } from 'react'
import { Icon } from '@//:modules/content'
import SynchronizeArrow1 from '@streamlinehq/streamlinehq/img/streamline-regular/synchronize-arrow-1-WipT2h.svg'
import { Button as ChakraButton } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const AnimatedButton = motion(ChakraButton)

type Props = {
  loading?: boolean,
  children?: Node,
  sx?: {},
  disabled?: boolean,
};

export default function Button ({
  sx,
  loading,
  children,
  disabled,
  ...rest
}: Props): Node {
  const fullDisable = disabled || loading

  return (
    <AnimatedButton
      type='button'
      {...rest}
      radius='xl'
      size='lg'
      disabled={fullDisable}
      whileTap={{ scale: 1.1 }}
    >
      {loading ? <Icon icon={SynchronizeArrow1} stroke='inherit' /> : children}
    </AnimatedButton>
  )
}
