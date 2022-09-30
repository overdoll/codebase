import RootFeedback from './RootFeedback/RootFeedback'

RootFeedback.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

export default RootFeedback
