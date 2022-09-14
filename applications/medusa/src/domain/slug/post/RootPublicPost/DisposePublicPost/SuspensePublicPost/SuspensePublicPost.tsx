import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { MobileContainer } from '@//:modules/content/PageLayout'

export default function SuspensePublicPost (): JSX.Element {
  return (
    <MobileContainer>
      <SkeletonPost />
    </MobileContainer>
  )
}
