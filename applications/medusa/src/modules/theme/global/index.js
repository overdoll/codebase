const global = props => ({
  body: {
    fontFamily: 'body',
    color: 'gray.100',
    bg: 'gray.900',
    lineHeight: 'base',
  },
  '*::placeholder': {
    color: 'gray.400',
  },
  '*, *::before, &::after': {
    borderColor: 'gray.200',
    wordWrap: 'break-word',
  },
});

export default global;
