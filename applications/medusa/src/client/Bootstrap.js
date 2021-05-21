/**
 * @flow
 */
import type { Node } from 'react'
import { CacheProvider } from '@emotion/react'
import { I18nextProvider } from 'react-i18next'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import createCache from '@emotion/cache'
import { ChakraProvider } from '@chakra-ui/react'
import RelayEnvironment from '@//:modules/relay/RelayEnvironment'
import theme from '@//:modules/theme'
import { FlashProvider } from '@//:modules/flash'

type Props = {
  environment: typeof RelayEnvironment,
  i18next: any,
  children: Node,
};

const nonce = document
  .querySelector('meta[name="nonce"]')
  ?.getAttribute('content')

const cache = createCache({ key: 'od', nonce })

// eslint-disable-next-line no-underscore-dangle
window.__webpack_nonce__ = nonce

/**
 * Default Providers
 * Used for bootstrapping client app && a provider for writing tests
 */
export default function Bootstrap (props: Props): Node {
  return (
    <FlashProvider>
      <CacheProvider value={cache}>
        <I18nextProvider i18n={props.i18next}>
          <ChakraProvider theme={theme}>
            <RelayEnvironmentProvider environment={props.environment}>
              {props.children}
            </RelayEnvironmentProvider>
          </ChakraProvider>
        </I18nextProvider>
      </CacheProvider>
    </FlashProvider>
  )
}
