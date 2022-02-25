import { Dispatch } from 'react'

// for the individual resolvers
export interface ResolverFunctionProps<T> {
  value: T
}

export declare type ResolverFunction<S> = (resolverState: S, resolverAction: SequenceAction<S>) => S

// for the useSequence hook

// get deep type of value of T here
export declare type SequenceResolver<T> = {
  [S in keyof T]: ResolverFunction<T[S]>
}

export type SequenceRecords = Record<string, any>

declare type SequenceActionType<T extends SequenceRecords = SequenceRecords> = keyof T
declare type SequenceActionValue<T extends SequenceRecords = SequenceRecords> = T[keyof T]
declare type SequenceTransformers = 'SET' | 'ADD' | 'REMOVE'

export interface SequenceAction<T> {
  type: SequenceActionType<T>
  value: SequenceActionValue<T>
  transform: SequenceTransformers
}

export interface SequenceResetAction<T> {
  type: 'initial_state'
  value: T
  transform: SequenceTransformers
}

export interface UseSequenceProps<T> {
  resolver: SequenceResolver<T>
  defaultValue: T
}

export interface UseSequenceReturn<T> {
  state: T
  dispatch: Dispatch<SequenceAction<T>>
  reset: () => void
}
