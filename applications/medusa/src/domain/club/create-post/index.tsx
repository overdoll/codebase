import RootCreatePost from './RootCreatePost/RootCreatePost'
import ResultCreatePostQuery from '@//:artifacts/ResultCreatePostQuery.graphql'
import ClubLayout from '../../../common/components/Layouts/ClubLayout/ClubLayout'
import RootClubPosts from '../posts'
import ClubRedirect from '@//:modules/redirects/club'

RootCreatePost.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootCreatePost.getRelayPreloadProps = (ctx) => {
  const {
    query: {
      slug,
      post
    }
  } = ctx

  return {
    queries: {
      postCreatorQuery: {
        params: ResultCreatePostQuery.params,
        variables: {
          slug: slug,
          reference: post ?? ''
        }
      }
    }
  }
}

RootCreatePost.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

RootClubPosts.getMiddleware = (ctx, data) => {
  return ClubRedirect(data)
}

export default RootCreatePost
