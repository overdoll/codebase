export default {
  breakpoints: ['40em', '52em', '64em'],
  fontSizes: [
    '1rem', // 12
    '1.1666666666666667rem', // 14
    '1.3333333333333333rem', // 16
    '1.5rem', // 18
    '1.6666666666666667rem', // 20
    '2rem', // 24
    '2.5rem', // 30
    '3rem', // 36
  ],
  colors: {
    text: '#ffffff',
    background: '#1a1a1a',
    neutral: {
      900: 'hsla(0,0%,10%,1)',
      800: 'hsla(0,0%,13%,1)',
      700: 'hsla(0,0%,14%,1)',
      600: 'hsla(0,2%,15%,1)',
      500: 'hsla(0,3%,17%,1)',
      400: 'hsla(0,3%,21%,1)',
      300: 'hsla(0,2%,25%,1)',
      200: 'hsla(0,2%,35%,1)',
      100: 'hsla(2,5%,75%,1)',
      50: 'hsla(2,5%,75%,0.15)',
      '000': 'hsla(0,0%,100%,1)',
    },
    primary: {
      900: 'hsla(346,90%,15%,1)',
      800: 'hsla(345,93%,20%,1)',
      700: 'hsla(343,78%,31%,1)',
      600: 'hsla(344,83%,46%,1)',
      500: 'hsla(342,100%,58%,1)',
      400: 'hsla(341,100%,62%,1)',
      300: 'hsla(340,99%,71%,1)',
      200: 'hsla(338,90%,75%,1)',
      100: 'hsla(335,92%,89%,1)',
      50: 'hsla(335,92%,89%,0.15)',
    },
    orange: {
      900: 'hsla(25,100%,15%,1)',
      800: 'hsla(27,100%,19%,1)',
      700: 'hsla(27,100%,31%,1)',
      600: 'hsla(28,100%,38%,1)',
      500: 'hsla(30,100%,50%,1)',
      400: 'hsla(33,100%,58%,1)',
      300: 'hsla(35,100%,65%,1)',
      200: 'hsla(37,99%,73%,1)',
      100: 'hsla(40,100%,85%,1)',
      50: 'hsla(40,100%,85%,0.15)',
    },
    teal: {
      900: 'hsla(200,85%,15%,1)',
      800: 'hsla(197,99%,25%,1)',
      700: 'hsla(195,98%,33%,1)',
      600: 'hsla(192,99%,45%,1)',
      500: 'hsla(189,100%,51%,1)',
      400: 'hsla(189,100%,64%,1)',
      300: 'hsla(183,92%,68%,1)',
      200: 'hsla(176,99%,79%,1)',
      100: 'hsla(173,100%,93%,1)',
      50: 'hsla(173,100%,93%,0.15)',
    },
    green: {
      900: 'hsla(140,80%,16%,1)',
      800: 'hsla(142,76%,22%,1)',
      700: 'hsla(145,82%,32%,1)',
      600: 'hsla(148,83%,47%,1)',
      500: 'hsla(149,100%,49%,1)',
      400: 'hsla(153,97%,57%,1)',
      300: 'hsla(153,98%,70%,1)',
      200: 'hsla(157,96%,77%,1)',
      100: 'hsla(160,90%,90%,1)',
      50: 'hsla(160,90%,90%,1)',
    },
    purple: {
      900: 'hsla(265,90%,15%,1)',
      800: 'hsla(265,87%,26%,1)',
      700: 'hsla(265,91%,33%,1)',
      600: 'hsla(267,88%,39%,1)',
      500: 'hsla(269,98%,50%,1)',
      400: 'hsla(271,93%,60%,1)',
      300: 'hsla(275,88%,69%,1)',
      200: 'hsla(277,93%,78%,1)',
      100: 'hsla(281,88%,90%,1)',
      50: 'hsla(281,88%,90%,0.15)',
    },
  },
  space: [
    '0.3333333333333333rem',
    '0.6666666666666666rem',
    '1rem',
    '1.3333333333333333rem',
    '2rem',
    '2.6666666666666665rem',
    '4rem',
  ],
  fonts: {
    body: 'Noto Sans JP',
    heading: 'Nunito',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  shadows: {
    100: '0px 0px 2px rgba(0, 0, 0, 0.5)',
    200: '0px 0px 5px rgba(0, 0, 0, 0.5)',
    300: '0px 0px 10px 2px rgba(0, 0, 0, 0.5)',
    400: '0px 0px 20px 5px rgba(0, 0, 0, 0.5)',
    500: '0px 0px 40px rgba(0, 0, 0, 0.5)',
  },
  styles: {
    root: {
      fontSize: '12px',
    },
  },
  variants: {},
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
    display: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: [5, 6, 7],
    },
  },
  radii: {
    default: 15,
  },
  borderWidths: {
    default: 2,
  },
  borders: {
    primary: 'primary.500',
  },
  buttons: {
    primary: {
      fontSize: 2,
      fontWeight: 'bold',
      color: 'primary.500',
      bg: 'neutral.900',
      fontFamily: 'heading',
      borderRadius: 'default',
      borderColor: 'primary.500',
      borderWidth: 'default',
      borderStyle: 'solid',
      pl: 6,
      pr: 6,
    },
  },
};
