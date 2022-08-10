import { ReactNode } from 'react'
import OverflowVisual from '../PostGalleryPublicSimple/OverflowVisual/OverflowVisual'

interface Props {
  children: ReactNode
}

export default function PostHideOverflow ({ children }: Props): JSX.Element {
  return (
    <OverflowVisual
      minH={300}
      maxH={700}
      align='center'
    >
      {children}
    </OverflowVisual>
  )
}
