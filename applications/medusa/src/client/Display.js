/**
 * @flow
 */
import type { Node } from 'react'
import { CacheProvider } from '@emotion/react'
import { I18nextProvider } from 'react-i18next'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import type { i18next } from 'i18next'
import { HelmetProvider } from 'react-helmet-async'
import OverlayScrollbars from 'overlayscrollbars'

type Props = {
  i18next: i18next,
  emotionCache: {},
  helmetContext?: {},
  children: Node,
};

/**
 * Display is a component used to mount the providers
 * that are required to have a "display"
 *
 * Useful for SSR when you need to do a pure SSR render (error pages, etc..)
 */
export default function Display ({
  emotionCache,
  i18next,
  helmetContext = {},
  children
}: Props): Node {
  return (
    <CacheProvider value={emotionCache}>
      <I18nextProvider i18n={i18next}>
        <HelmetProvider context={helmetContext}>
          <ChakraProvider theme={theme}>
            {children}
          </ChakraProvider>
        </HelmetProvider>
      </I18nextProvider>
    </CacheProvider>
  )
}
