import React, { ReactNode, useMemo } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import useLazyArguments from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import { useRouter } from 'next/router'
import LazyPublicClubLayout from './LazyPublicClubLayout/LazyPublicClubLayout'
import SuspenseLazyPosts
  from '../../../../../modules/content/HookedComponents/Post/components/SuspenseLazyPosts/SuspenseLazyPosts'
import { LazyPostsErrorBoundary } from '@//:modules/content/HookedComponents/Post'

export interface PublicClubLayoutLazyProps {
  slug: string
}

interface Props {
  children: ReactNode
}

export default function PublicClubLayout (props: Props): JSX.Element {
  const { children } = props
  const { query: { slug } } = useRouter()

  const {
    lazyArguments,
    loadQuery
  } = useLazyArguments<PublicClubLayoutLazyProps>({
    defaultValue: {
      slug: slug as string
    }
  })

  const memoContent = useMemo(() => (
    <>
      <PageContainer>
        <LazyPostsErrorBoundary loadQuery={loadQuery}>
          <SuspenseLazyPosts>
            <LazyPublicClubLayout lazyArguments={lazyArguments} />
          </SuspenseLazyPosts>
        </LazyPostsErrorBoundary>
      </PageContainer>
    </>
  ), [slug])

  return (
    <>
      {memoContent}
      {children}
    </>
  )
}
