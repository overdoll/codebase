import { ThemeProvider } from 'theme-ui';
import theme from '../src/client/theme';
import darkTheme from './dark';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: {
    theme: darkTheme,
  },
};

export const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];
