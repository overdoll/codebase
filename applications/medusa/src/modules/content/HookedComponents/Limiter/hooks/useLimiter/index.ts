import { LimiterValues, UseLimiterProps, UseLimiterReturn } from '../../types'
import { useState } from 'react'

function useLimiter<TArguments extends LimiterValues = LimiterValues> (props: UseLimiterProps<TArguments>): UseLimiterReturn<TArguments> {
  const {
    data = [],
    amount
  } = props

  const [expanded, setExpanded] = useState(data.length <= amount)

  const onExpand = (): void => {
    setExpanded(true)
  }

  const constructedData = expanded ? data : data.slice(0, amount)

  const hiddenData = expanded ? [] : data.slice(amount)

  return {
    constructedData,
    onExpand,
    hiddenData,
    hasExpansion: !expanded
  }
}

export default useLimiter
