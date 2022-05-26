import RootClubRevenue from './RootClubRevenue/RootClubRevenue'
import ClubRevenueQuery from '@//:artifacts/ClubRevenueQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'

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

export default RootClubRevenue
