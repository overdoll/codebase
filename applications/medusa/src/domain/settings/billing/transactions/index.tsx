import RootTransactionsSettings from './RootTransactionsSettings/RootTransactionsSettings'
import TransactionsSettingsQuery from '@//:artifacts/TransactionsSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootTransactionsSettings.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

RootTransactionsSettings.getRelayPreloadProps = () => {
  return {
    queries: {
      transactionsQuery: {
        params: TransactionsSettingsQuery.params,
        variables: {}
      }
    }
  }
}

RootTransactionsSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootTransactionsSettings
