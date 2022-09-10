import { useId, useMemo } from 'react'
import { Random } from '../utilities/random'
import hash from '../utilities/hash'

export default function getRandomSeed (): string {
  const id = useId()

  const memoized = useMemo(() => new Random(hash(id)), [id])

  return `${useMemo(() => memoized.nextInt31(), [id])}`
}
