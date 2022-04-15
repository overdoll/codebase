import CatchAll from './CatchAll/CatchAll'

CatchAll.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )
  return {
    ...translation.messages
  }
}

export default CatchAll
