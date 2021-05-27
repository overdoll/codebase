/**
 * @flow
 */
import type { Node } from 'react'
import { CacheProvider } from '@emotion/react'
import { I18nextProvider } from 'react-i18next'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import createCache from '@emotion/cache'
import { ChakraProvider } from '@chakra-ui/react'
import RelayEnvironment from './utilities/relay/RelayEnvironment'
import theme from '@//:modules/theme'
import { FlashProvider } from '@//:modules/flash'
import type { i18next } from 'i18next'
import { HelmetProvider } from 'react-helmet-async'
import { RuntimeProvider } from '@//:modules/runtime'

type Props = {
  environment: typeof RelayEnvironment,
  i18next: i18next,
  children: Node,
};

const nonce = document
  .querySelector('meta[name="nonce"]')
  ?.getAttribute('content')

const cache = createCache({ key: 'od', nonce })

window.__webpack_nonce__ = nonce

/**
 * Default Providers
 * Used for bootstrapping client app && a provider for writing tests
 */
export default function Bootstrap (props: Props): Node {
  return (
    <HelmetProvider>
      <FlashProvider>
        <RuntimeProvider>
          <CacheProvider value={cache}>
            <I18nextProvider i18n={props.i18next}>
              <ChakraProvider theme={theme}>
                <RelayEnvironmentProvider environment={props.environment}>
                  {props.children}
                </RelayEnvironmentProvider>
              </ChakraProvider>
            </I18nextProvider>
          </CacheProvider>
        </RuntimeProvider>
      </FlashProvider>
    </HelmetProvider>
  )
}
