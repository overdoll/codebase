import Artists from './Artists/Artists'

Artists.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

export default Artists
