/**
 * @flow
 */
import type { Node } from 'react';
import RelayEnvironment from '@//:modules/relay/RelayEnvironment';
import { CacheProvider, Global } from '@emotion/react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import createCache from '@emotion/cache';

type Props = {
  environment: typeof RelayEnvironment,
  i18next: any,
  children: Node,
};

const nonce = document
  .querySelector('meta[name="nonce"]')
  ?.getAttribute('content');

const cache = createCache({ key: 'css', nonce: nonce });

window.__webpack_nonce__ = nonce;

/**
 * Default Providers
 * Used for bootstrapping client app && a provider for writing tests
 */
export default function Bootstrap(props: Props): Node {
  return (
    <CacheProvider value={cache}>
      <I18nextProvider i18n={props.i18next}>
        <ThemeProvider theme={theme}>
          <Global
            // temporary disable "iframe" - so that the error overlay
            styles={theme => ({
              iframe: {
                display: 'none',
              },
            })}
          />
          <RelayEnvironmentProvider environment={props.environment}>
            {props.children}
          </RelayEnvironmentProvider>
        </ThemeProvider>
      </I18nextProvider>
    </CacheProvider>
  );
}
