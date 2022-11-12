import RootClubMembers from './RootClubMembers/RootClubMembers'
import ClubMembersQuery from '@//:artifacts/ClubMembersQuery.graphql'
import ClubLayout from '../../../common/components/Layouts/ClubLayout/ClubLayout'

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

export default RootClubMembers
