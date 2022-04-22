import RootClubPosts from './RootClubPosts/RootClubPosts'
import ClubPostsQuery from '@//:artifacts/ClubPostsQuery.graphql'
import ClubLayout from '../../../common/components/Layouts/ClubLayout/ClubLayout'

RootClubPosts.getRelayPreloadProps = (ctx) => {
  const { query: { slug } } = ctx

  return {
    queries: {
      clubPostsQuery: {
        params: ClubPostsQuery.params,
        variables: {
          slug: slug
        }
      }
    }
  }
}

RootClubPosts.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

export default RootClubPosts
