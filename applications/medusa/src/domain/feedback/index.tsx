import Feedback from './Feedback/Feedback'

Feedback.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

export default Feedback
