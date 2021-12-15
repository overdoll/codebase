import { ReactNode, useMemo } from 'react'
import defineAbility from './defineAbility'
import { AbilityContext } from './AbilityContext'

interface Props {
  children: ReactNode
  data: any
}

export default function AbilityProvider ({
  children,
  data
}: Props): JSX.Element {
  const ability = useMemo(() => defineAbility(data?.viewer), [data?.viewer])

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  )
}
