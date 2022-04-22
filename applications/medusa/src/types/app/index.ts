import { AppProps } from 'next/app'
import {
  CacheConfig,
  DisposeFn,
  GraphQLResponse,
  IEnvironment,
  Observable,
  RequestParameters,
  Variables
} from 'relay-runtime'
import { i18n, Messages } from '@lingui/core'
import { SetupSecurityTokenReturn } from '@//:modules/next/security'
import { EnvironmentProviderOptions } from 'react-relay/hooks'
import { PreloadFetchPolicy } from 'react-relay/relay-hooks/EntryPointTypes'
import { BaseContext, NextComponentType, NextPageContext } from 'next/dist/shared/lib/utils'
import { ComponentType } from 'react'
import Cookies from 'universal-cookie'
import { NextResponse, NextRequest, NextFetchEvent } from 'next/server'

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

export type SecurityToken = SetupSecurityTokenReturn

export type Queries = Record<string, CustomPreloadedQuery>

export type ComponentProps = Partial<{
  queryRefs: Queries
}>

export type RequestProps = Partial<{
  preloadedQueryResults: Record<string, CustomPreloadedQuery>
}>

export interface CustomAppProps extends AppProps {
  Component: PageProps<NextPageContext, any>
  environment: IEnvironment
  i18n: typeof i18n
  componentProps: ComponentProps
  requestProps: RequestProps
  securityToken: SecurityToken
  translationProps: TranslationProps
}

export type GetRelayPreloadPropsReturn = Partial<{
  queries: {
    [query: string]: {
      params: RequestParameters
      variables: Variables
    }
  }
}>

interface PageContext extends NextPageContext {
  cookies: Cookies
}

export declare type CustomComponentType<C extends BaseContext = PageContext, P = {}> = ComponentType<P> & {
  getRelayPreloadProps?: (context: C) => GetRelayPreloadPropsReturn
  getTranslationProps?: (context: C) => Promise<TranslationProps>
  getLayout?: (page: JSX.Element) => JSX.Element
}

export type PageProps<P = {}, IP = P> =
  NextComponentType<PageContext, IP, P>
  & CustomComponentType<PageContext, P>

// middleware
type NextMiddlewareResult = NextResponse | Response | null | undefined

export type Middleware = (
  request: NextRequest,
  event: NextFetchEvent
) => NextMiddlewareResult | Promise<NextMiddlewareResult>
