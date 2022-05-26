import RootPostReports from './RootPostReports/RootPostReports'
import ModerationLayout from '../../../common/components/Layouts/ModerationLayout/ModerationLayout'

RootPostReports.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootPostReports.getLayout = (page) => {
  return (
    <ModerationLayout>
      {page}
    </ModerationLayout>
  )
}

export default RootPostReports
