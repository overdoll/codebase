import RootLikedPosts from './RootLikedPosts/RootLikedPosts'
import ResultLikedPostsQuery from '@//:artifacts/ResultLikedPostsQuery.graphql'
import ClubsLayout from '@//:common/components/Layouts/ClubsLayout/ClubsLayout'

RootLikedPosts.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootLikedPosts.getRelayPreloadProps = () => ({
  queries: {
    likedPostsQuery: {
      params: ResultLikedPostsQuery.params,
      variables: {}
    }
  }
})

RootLikedPosts.getLayout = (page) => {
  return (
    <ClubsLayout>
      {page}
    </ClubsLayout>
  )
}

export default RootLikedPosts
