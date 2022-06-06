import RootStaffCreateCharacter from './RootStaffCreateCharacter/RootStaffCreateCharacter'
import StaffCreateCharacterQuery from '@//:artifacts/StaffCreateCharacterQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffCreateCharacter.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootStaffCreateCharacter.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffCreateCharacterQuery: {
        params: StaffCreateCharacterQuery.params,
        variables: {}
      }
    }
  }
}

RootStaffCreateCharacter.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffCreateCharacter
