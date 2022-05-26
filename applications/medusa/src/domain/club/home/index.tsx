import RootClubHome from './RootClubHome/RootClubHome'
import ClubHomeQuery from '@//:artifacts/ClubHomeQuery.graphql'
import ClubLayout from '../../../common/components/Layouts/ClubLayout/ClubLayout'

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

export default RootClubHome
