import {
  CacheConfig,
  DisposeFn,
  GraphQLResponse,
  IEnvironment,
  Observable,
  RequestParameters,
  Variables
} from 'relay-runtime'
import { Messages } from '@lingui/core'
import { EnvironmentProviderOptions } from 'react-relay/hooks'
import { PreloadFetchPolicy } from 'react-relay/relay-hooks/EntryPointTypes'
import { AppInitialProps, BaseContext, NextComponentType, NextPageContext } from 'next/dist/shared/lib/utils'
import { ComponentType } from 'react'
import Cookies from 'universal-cookie'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { AppProps } from 'next/app'

interface CustomPreloadedQuery {
  kind: 'PreloadedQuery' | 'SerializedPreloadedQuery'
  environment: IEnvironment | null
  environmentProviderOptions?: EnvironmentProviderOptions<any> | null | undefined
  fetchKey?: string | number
  fetchPolicy?: PreloadFetchPolicy
  networkCacheConfig?: CacheConfig | null | undefined
  id?: string | null | undefined
  name: string
  source?: Observable<GraphQLResponse> | null | undefined
  variables: Variables
  dispose?: DisposeFn
  isDisposed: boolean
}

export type TranslationProps = Messages & {}

export type Queries = Record<string, CustomPreloadedQuery>

export type ComponentProps = Partial<{
  queryRefs: Queries
}>

export interface RequestProps {
  preloadedQueryResults: {
    [k: string]: {
      params: any
      variables: any
      response: any
    }
  }
}

export interface CustomAppProps extends AppInitialProps {
  environment: IEnvironment
  requestProps: RequestProps
  securityToken: string
  translationProps: any
  relayStore: any
  appHeaders: any
  cookies: any
}

export interface CustomPageAppProps extends AppProps {
  Component: PageProps<NextPageContext, any>
  environment: IEnvironment
  requestProps: RequestProps
  translationProps: any
  securityToken: string
  relayStore: any
  appHeaders: any
  ctx: any
  cookies: any
}

export type GetRelayPreloadPropsReturn = Partial<{
  queries: {
    [query: string]: {
      params: RequestParameters
      variables: Variables
    }
  }
}>

export type GetCookiePropsReturn = Partial<{
  cookies: {
    [cookieName: string]: string
  }
}>

export type GetMiddlewareReturn = Partial<{
  redirect?: {
    permanent: boolean
    destination: string
  }
  notFound?: boolean
}>

export type GetTranslationPropsReturn = Promise<Partial<{
  translations: any
}>>

interface PageContext extends NextPageContext {
  cookies: Cookies
}

export declare type CustomComponentType<C extends BaseContext = PageContext, P = {}> =
  ComponentType<React.PropsWithChildren<P>>
  & {
    getCookieProps?: (context: C) => GetCookiePropsReturn
    getRelayPreloadProps?: (context: C) => GetRelayPreloadPropsReturn
    getMiddleware?: (context: C, data: any) => GetMiddlewareReturn
    getTranslationProps?: (context: C) => GetTranslationPropsReturn
    getLayout?: (page: JSX.Element) => JSX.Element
  }

export type PageProps<P = {}, IP = P> =
  NextComponentType<PageContext, IP, P>
  & CustomComponentType<PageContext, P>

// middleware
type NextMiddlewareResult = NextResponse | Response | null | undefined

export type Middleware = (
  request: NextRequest,
  event: NextFetchEvent,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>
    msExitFullscreen?: () => Promise<void>
    webkitExitFullscreen?: () => Promise<void>
    mozFullScreenElement?: Element
    msFullscreenElement?: Element
    webkitFullscreenElement?: Element
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>
    mozRequestFullScreen?: () => Promise<void>
    webkitRequestFullscreen?: (method) => Promise<void>
  }

  interface Element {
    ALLOW_KEYBOARD_INPUT: boolean
  }

  interface HTMLVideoElement {
    webkitSupportsFullscreen: boolean
    webkitEnterFullscreen: () => void
    webkitPresentationMode: 'picture-in-picture' | 'inline' | 'fullscreen'
  }

}
