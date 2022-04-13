export default function global (props): any {
  return {
    body: {
      fontFamily: 'body',
      color: 'gray.100',
      bg: 'gray.900',
      lineHeight: 'base',
      overflow: 'hidden',
      position: 'initial'
    },
    '*::placeholder': {
      color: 'gray.400'
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
