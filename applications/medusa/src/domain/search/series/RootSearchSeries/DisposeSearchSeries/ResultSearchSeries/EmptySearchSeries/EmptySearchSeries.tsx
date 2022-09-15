import React from 'react'
import { MobileContainer } from '@//:modules/content/PageLayout'
import { NotFoundSerial } from '@//:modules/content/Placeholder'

export default function EmptySearchSeries (): JSX.Element {
  return (
    <>
      <MobileContainer>
        <NotFoundSerial />
      </MobileContainer>
    </>
  )
}
