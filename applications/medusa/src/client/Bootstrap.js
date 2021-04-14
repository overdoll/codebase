/**
 * @flow
 */
import type { Node } from 'react';
import RelayEnvironment from '@//:modules/relay/RelayEnvironment';
import { CacheProvider } from '@emotion/react';
import { I18nextProvider } from 'react-i18next';
import theme from './theme';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import createCache from '@emotion/cache';
import { NotificationProvider } from '@//:modules/focus';
import { ChakraProvider } from '@chakra-ui/react';

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
        <ChakraProvider theme={theme}>
          <RelayEnvironmentProvider environment={props.environment}>
            <NotificationProvider>{props.children}</NotificationProvider>
          </RelayEnvironmentProvider>
        </ChakraProvider>
      </I18nextProvider>
    </CacheProvider>
  );
}
