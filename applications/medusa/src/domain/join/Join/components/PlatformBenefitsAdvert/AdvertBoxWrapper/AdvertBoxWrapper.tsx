import { ReactNode } from 'react'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  children: ReactNode
}

const BOX_PROPS = {
  h: 500,
  w: {
    md: 360,
    base: '100%'
  },
  py: {
    md: 4,
    base: 2
  },
  px: {
    md: 4,
    base: 2
  }
}

export default function AdvertBoxWrapper ({ children }: Props): JSX.Element {
  return (
    <LargeBackgroundBox {...BOX_PROPS}>
      {children}
    </LargeBackgroundBox>
  )
}
