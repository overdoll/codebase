import RootClubPayments from './RootClubPayments/RootClubPayments'
import ClubPaymentsQuery from '@//:artifacts/ClubPaymentsQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'

RootClubPayments.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootClubPayments.getRelayPreloadProps = (ctx) => {
  const { query: { slug } } = ctx

  return {
    queries: {
      clubPaymentsQuery: {
        params: ClubPaymentsQuery.params,
        variables: {
          slug: slug
        }
      }
    }
  }
}

RootClubPayments.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

export default RootClubPayments
