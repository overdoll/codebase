import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function RouletteScreenBackground (props: Props): JSX.Element {
  const { children } = props

  return (
    <LargeBackgroundBox overflow='hidden' p={0} h='85vh' w='100%'>
      {children}
    </LargeBackgroundBox>
  )
}
