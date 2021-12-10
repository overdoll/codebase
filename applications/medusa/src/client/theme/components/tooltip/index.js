import { mode } from '@chakra-ui/theme-tools';

function baseStyle (props) {
  const bg = mode('gray.700', 'gray.500')(props)
  return {
    '--tooltip-bg': `colors.${bg}`,
    px: '8px',
    py: '2px',
    bg: 'var(--tooltip-bg)',
    '--popper-arrow-bg': 'var(--tooltip-bg)',
    color: mode('whiteAlpha.900', 'gray.100')(props),
    borderRadius: 'sm',
    fontWeight: 'medium',
    fontSize: 'sm',
    boxShadow: 'md',
    maxW: '320px',
    zIndex: 'tooltip'
  }
}

export default {
  baseStyle
}
