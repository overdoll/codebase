import ConfirmEmail from './ConfirmEmail/ConfirmEmail'

ConfirmEmail.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

export default ConfirmEmail
