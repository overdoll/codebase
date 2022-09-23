import { useEffect } from 'react'
import SuspenseRoulette from '../SuspenseRoulette/SuspenseRoulette'

interface Props {
  loadQuery: () => void
}

export default function LoadRoulette (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <SuspenseRoulette />
  )
}
