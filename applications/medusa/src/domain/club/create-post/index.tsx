import CreatePost from './CreatePost/CreatePost'
import PostCreatorQuery from '@//:artifacts/PostCreatorQuery.graphql'
import ClubLayout from '../../../common/components/Layouts/ClubLayout/ClubLayout'

CreatePost.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

CreatePost.getRelayPreloadProps = (ctx) => {
  const {
    query: {
      slug,
      post
    }
  } = ctx

  return {
    queries: {
      postCreatorQuery: {
        params: PostCreatorQuery.params,
        variables: {
          slug: slug,
          reference: post ?? ''
        }
      }
    }
  }
}

CreatePost.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

export default CreatePost
