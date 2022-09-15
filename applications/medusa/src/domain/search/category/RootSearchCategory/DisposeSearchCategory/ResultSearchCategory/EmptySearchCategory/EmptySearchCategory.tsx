import React from 'react'
import { MobileContainer } from '@//:modules/content/PageLayout'
import { NotFoundCategory } from '@//:modules/content/Placeholder'

export default function EmptySearchCategory (): JSX.Element {
  return (
    <>
      <MobileContainer>
        <NotFoundCategory />
      </MobileContainer>
    </>
  )
}
