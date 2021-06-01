import { create } from '@storybook/theming'

export default create({
  base: 'dark',

  // UI
  appBg: 'hsla(0,0%,14%,1)',
  appContentBg: '#1a1a1a',

  colorPrimary: '#FF4785', // coral
  colorSecondary: 'hsla(342,100%,58%,1)', // ocean

  // Typography
  fontBase: [
    '"Nunito"',
    '-apple-system',
    '".SFNSText-Regular"',
    '"San Francisco"',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Helvetica Neue"',
    'Helvetica',
    'Arial',
    'sans-serif'
  ].join(', '),
  fontCode: [
    '"Operator Mono"',
    '"Fira Code Retina"',
    '"Fira Code"',
    '"FiraCode-Retina"',
    '"Andale Mono"',
    '"Lucida Console"',
    'Consolas',
    'Monaco',
    'monospace'
  ].join(', '),

  brandTitle: 'overdoll',
  brandUrl: '',
  brandImage: '/favicon.ico'
})
