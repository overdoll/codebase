import RootClubRevenue from './RootClubRevenue/RootClubRevenue'
import ClubRevenueQuery from '@//:artifacts/ClubRevenueQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'
import ClubRedirect from '@//:modules/redirects/club'

RootClubRevenue.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootClubRevenue.getRelayPreloadProps = (ctx) => {
  const { query: { slug } } = ctx

  return {
    queries: {
      clubRevenueQuery: {
        params: ClubRevenueQuery.params,
        variables: {
          slug: slug
        }
      }
    }
  }
}

RootClubRevenue.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

RootClubRevenue.getMiddleware = (ctx, data) => {
  return ClubRedirect(data)
}

export default RootClubRevenue
