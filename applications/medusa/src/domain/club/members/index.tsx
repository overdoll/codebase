import RootClubMembers from './RootClubMembers/RootClubMembers'
import ClubMembersQuery from '@//:artifacts/ClubMembersQuery.graphql'
import ClubLayout from '../../../common/components/Layouts/ClubLayout/ClubLayout'
import ClubRedirect from '@//:modules/redirects/club'

RootClubMembers.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootClubMembers.getRelayPreloadProps = (ctx) => {
  const { query: { slug } } = ctx

  return {
    queries: {
      clubMembersQuery: {
        params: ClubMembersQuery.params,
        variables: {
          slug: slug
        }
      }
    }
  }
}

RootClubMembers.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

RootClubMembers.getMiddleware = (ctx, data) => {
  return ClubRedirect(data)
}

export default RootClubMembers
