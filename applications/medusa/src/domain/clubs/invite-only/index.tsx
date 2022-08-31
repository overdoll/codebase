import InviteOnly from './InviteOnly/InviteOnly'

InviteOnly.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

export default InviteOnly
