import RootClubHome from './RootClubHome/RootClubHome'
import ClubHomeQuery from '@//:artifacts/ClubHomeQuery.graphql'
import ClubLayout from '../../../common/components/Layouts/ClubLayout/ClubLayout'
import ClubRedirect from '@//:modules/redirects/club'

RootClubHome.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootClubHome.getRelayPreloadProps = (ctx) => {
  const { query: { slug } } = ctx

  return {
    queries: {
      clubHomeQuery: {
        params: ClubHomeQuery.params,
        variables: {
          slug: slug
        }
      }
    }
  }
}

RootClubHome.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

RootClubHome.getMiddleware = (ctx, data) => {
  return ClubRedirect(data)
}

export default RootClubHome
