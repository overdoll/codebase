import Creators from './Creators/Creators'

Creators.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

export default Creators
