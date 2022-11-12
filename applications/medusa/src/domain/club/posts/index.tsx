import RootClubPosts from './RootClubPosts/RootClubPosts'
import ClubPostsQuery from '@//:artifacts/ClubPostsQuery.graphql'
import ClubLayout from '../../../common/components/Layouts/ClubLayout/ClubLayout'
import ClubRedirect from '@//:modules/redirects/club'

RootClubPosts.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootClubPosts.getRelayPreloadProps = (ctx) => {
  const {
    query: {
      slug,
      state
    }
  } = ctx

  return {
    queries: {
      clubPostsQuery: {
        params: ClubPostsQuery.params,
        variables: {
          slug: slug,
          state: state ?? null
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

RootClubPosts.getMiddleware = (ctx, data) => {
  return ClubRedirect(data)
}

export default RootClubPosts
