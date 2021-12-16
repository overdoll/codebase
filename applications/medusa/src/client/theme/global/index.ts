export default function (props): any {
  return {
    body: {
      fontFamily: 'body',
      color: 'gray.100',
      bg: 'gray.900',
      lineHeight: 'base',
      overflow: 'hidden',
      position: 'initial'
    },
    heading: {
      fontWeight: 600
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
    '.swiper-pagination-bullet-active': {
      background: 'primary.500',
      opacity: 0.5
    },
    '.swiper-pagination-bullets': {
      opacity: 0.5
    },
    '.swiper-button-next.swiper-button-disabled': {
      opacity: 0
    },
    '.swiper-button-prev.swiper-button-disabled': {
      opacity: 0
    },
    '.swiper-button-next': {
      color: 'gray.700',
      opacity: 0.3
    },
    '.swiper-button-prev': {
      color: 'gray.700',
      opacity: 0.3
    },
    'input:-webkit-autofill': {
      color: 'gray.800'
    },
    '.os-scrollbar-handle': {
      opacity: 0.3,
      zIndex: 0
    },
    form: {
      width: '100%'
    },
    '::selection': {
      background: 'gray.300'
    },
    '::-moz-selection': {
      background: 'gray.300'
    },
    'chakra-progress__track': {
      stroke: 'gray.700'
    }
  }
}
