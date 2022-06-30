export type LimiterValues = Array<Record<string, any>>

type onExpand = () => void

export interface UseLimiterProps<TArguments extends LimiterValues = LimiterValues> {
  data: TArguments | LimiterValues
  amount: number
}

export interface UseLimiterReturn<TArguments extends LimiterValues = LimiterValues> {
  constructedData: TArguments | LimiterValues
  onExpand: onExpand
  hasExpansion: boolean
  hiddenData: TArguments | LimiterValues
}
