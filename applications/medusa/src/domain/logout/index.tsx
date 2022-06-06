import Logout from './Logout/Logout'

Logout.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

export default Logout
