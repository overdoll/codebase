import React from 'react'
import { MobileContainer } from '@//:modules/content/PageLayout'
import { NotFoundCharacter } from '@//:modules/content/Placeholder'

export default function EmptySearchCharacter (): JSX.Element {
  return (
    <>
      <MobileContainer>
        <NotFoundCharacter />
      </MobileContainer>
    </>
  )
}
