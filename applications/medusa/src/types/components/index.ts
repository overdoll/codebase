import { ForwardedRef, FunctionComponent, ReactNode } from 'react'
import { ThemeTypings } from '@chakra-ui/styled-system'
import { UrlObject } from 'url'

export type MaybeRenderProp<P> =
  | ReactNode
  | ((props: P) => ReactNode)

export interface ForwardRefProp {
  forwardRef?: ForwardedRef<any>
}

export interface ConnectionProp {
  connectionId: string
}

export interface InputPlaceholder {
  placeholder: string
}

export type Timeout = ReturnType<typeof setTimeout>

export type ColorScheme = ThemeTypings['colorSchemes'] | (string & {})

export type IconType = FunctionComponent<any>

export type HrefType = string | UrlObject
