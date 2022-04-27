export default function global (props): any {
  return {
    html: {
      bg: 'gray.900'
    },
    body: {
      fontFamily: 'body',
      color: 'gray.100',
      bg: 'gray.900',
      lineHeight: 'base',
      position: 'initial',
      overflowY: 'overlay'
    },
    '*::placeholder': {
      color: 'gray.400'
    },
    '*::-webkit-scrollbar': {
      borderRadius: 'none',
      width: 2,
      height: 2
    },
    '*::-webkit-scrollbar-thumb': {
      background: 'hsla(1,0%,75%,0.05)',
      borderRadius: 'md'
    },
    '*::-webkit-scrollbar-track': {
      background: 'transparent',
      borderRadius: 'none'
    },
    '*, *::before, &::after': {
      borderColor: 'gray.200',
      wordWrap: 'break-word'
    },
    '*::focus': {
      color: 'primary.500'
    },
    'input:-webkit-autofill': {
      color: 'gray.800'
    },
    form: {
      width: '100%'
    },
    '::selection': {
      background: 'gray.300'
    },
    '::-moz-selection': {
      background: 'gray.300'
    }
  }
}
